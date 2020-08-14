import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/html';
import 'brace/mode/mysql'
import 'brace/theme/monokai';
import isHotkey from 'is-hotkey';
import _ from 'lodash';
import axios from 'axios';
import { debounce } from '../utils/helpers';

// Slate
import { Editable, withReact, Slate } from 'slate-react';
import { Editor, createEditor, Transforms } from 'slate';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlineIcon from '@material-ui/icons/FormatUnderlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '../CSS/textEditorStyles';

import { setCurEditorValue, updateNotesInFolder } from '../actions/noteActions';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';

const TextEditor = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedNote = useSelector((state) => state.notes.selectedNote);
    const noteJSON = useSelector((state) => state.notes.curEditorJSON);

    const [language, setLanguage] = useState('javascript');
    const [open, setOpen] = useState(false);
    const [bold, setBold] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [italic, setItalic] = useState(false);
    const [noteTitle, setNoteTitle] = useState(selectedNote.title);
    const [updateTitleCheck, setUpdateTitleCheck] = useState(false);
    const [saveCheck, setSaveCheck] = useState(false);
    const [tempValue, setTempValue] = useState(noNoteText);
    const [redirectToHome, setRedirectToHome] = useState(false);

    const editor = useMemo(() => withReact(createEditor()), []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const renderElement = useCallback((props) => <Element {...props} />, []);

    useEffect(() => {
        if (!_.isEmpty(selectedNote)) {
            dispatch(setCurEditorValue(JSON.parse(selectedNote.content)));
        }
        setBold(false);
        setUnderline(false);
        setItalic(false);
        setNoteTitle(selectedNote.title);
    }, [selectedNote]);

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleTitleChange = (event) => {
        setNoteTitle(event.target.value);
        debounce(() => {
            axios
                .post('/updateNote', {
                    id: selectedNote._id,
                    content: selectedNote.content,
                    title: noteTitle,
                })
                .then((res) => {
                    console.log(res);
                });
        }, 1000);
        setUpdateTitleCheck(false);
    };

    const updateTitle = debounce((value) => {
        axios
            .post('/updateNote', {
                id: selectedNote._id,
                content: selectedNote.content,
                title: value,
            })
            .then((res) => {
                console.log(res);
            });
        setUpdateTitleCheck(false);
    }, 3000);

    const logout = () => {
        axios
            .get('/logout')
            .then((res) => res.data)
            .then((data) => {
                if (data.logout) {
                    setRedirectToHome(true);
                }
            });
    };

    const Element = (props) => {
        const { attributes, children, element } = props;
        switch (element.type) {
            case 'code':
                return <AceElement {...props} />;
            default:
                return (
                    <p style={{ fontSize: '16px' }} {...attributes}>
                        {children}
                    </p>
                );
        }
    };

    const AceElement = ({ attributes, children, element }) => {
        const noteJSON2 = useSelector((state) => state.notes.curEditorJSON);
        var updatedCode = [];

        const onClick = () => {
            Editor.insertNode(editor, {
                children: [{ text: '' }],
            });
        };

        var handleCodeChange = debounce((newValue, editorId) => {
            updatedCode = noteJSON2.map((node) => {
                return node.editorId === editorId
                    ? { ...node, editorValue: newValue }
                    : { ...node };
            });
            dispatch(setCurEditorValue(updatedCode));
        }, 1500);

        return (
            <>
                <div contentEditable={false} style={{ marginLeft: '10px' }}>
                    <AceEditor
                        height="250px"
                        width="600px"
                        fontSize='14px'
                        mode={element.language}
                        theme="monokai"
                        value={element.editorValue}
                        onChange={(newValue) =>
                            handleCodeChange(newValue, element.editorId)
                        }
                    />
                </div>
                <p
                    {...attributes}
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                    onClick={onClick}
                    contentEditable={false}
                >
                    {children}
                </p>
            </>
        );
    };

    return (
        <div
            style={{
                backgroundColor: '#fff',
                minHeight: '50vh',
                width: '50vw',
            }}
        >
            {' '}
            {redirectToHome ? (
                <Redirect to="/" />
            ) : (
                <Slate
                    editor={editor}
                    value={_.isEmpty(selectedNote) ? tempValue : noteJSON}
                    onChange={(newValue) => {
                        if (_.isEmpty(selectedNote)) {
                            setTempValue(newValue);
                        } else {
                            dispatch(setCurEditorValue(newValue));
                        }
                    }}
                >
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.markButtons}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    setBold(!bold);
                                    toggleMark(editor, 'bold');
                                }}
                            >
                                <FormatBoldIcon
                                    className={
                                        bold
                                            ? classes.marksSelected
                                            : classes.marks
                                    }
                                />
                            </IconButton>
                            <IconButton
                                edge="start"
                                className={classes.markButtons}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    setUnderline(!underline);
                                    toggleMark(editor, 'underline');
                                }}
                            >
                                <FormatUnderlineIcon
                                    className={
                                        underline
                                            ? classes.marksSelected
                                            : classes.marks
                                    }
                                />
                            </IconButton>
                            <IconButton
                                edge="start"
                                className={classes.markButtons}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    setItalic(!italic);
                                    toggleMark(editor, 'italic');
                                }}
                            >
                                <FormatItalicIcon
                                    className={
                                        italic
                                            ? classes.marksSelected
                                            : classes.marks
                                    }
                                />
                            </IconButton>
                            <FormControl className={classes.editorLangForm}>
                                <InputLabel style={{}}>Language</InputLabel>
                                <Select
                                    value={language}
                                    onChange={handleChange}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    style={{ marginRight: '10px' }}
                                >
                                    <MenuItem value="javascript">
                                        Javascript
                                    </MenuItem>
                                    <MenuItem value="html">HTML</MenuItem>
                                    <MenuItem value="python">Python</MenuItem>
                                    <MenuItem value="mysql">SQL</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                onClick={(event) => {
                                    event.preventDefault();
                                    toggleBlock(editor, 'code', language);
                                }}
                                className={classes.addEditor}
                                disableElevation
                            >
                                <Typography
                                    variant="body2"
                                    className={classes.addEditorTxt}
                                >
                                    Add Editor
                                </Typography>
                            </Button>
                            <TextField
                                id="standard-basic"
                                label="Title"
                                defaultValue={noteTitle}
                                style={{ marginRight: '10px' }}
                                onChange={(e) => {
                                    setUpdateTitleCheck(true);
                                    updateTitle(e.target.value);
                                }}
                                className={classes.editorLangForm}
                            />
                            <CircularProgress
                                className={
                                    updateTitleCheck
                                        ? classes.updatingTitle
                                        : classes.notUpdatingTitle
                                }
                                size={20}
                            />
                            <IconButton
                                edge="start"
                                className={classes.markButtons}
                                style={{ marginLeft: '1vw' }}
                                onClick={() => {
                                    if (_.isEmpty(selectedNote)) {
                                        return;
                                    }
                                    setSaveCheck(true);
                                    axios
                                        .post('/updateNote', {
                                            id: selectedNote._id,
                                            content: JSON.stringify(noteJSON),
                                            title: selectedNote.title,
                                        })
                                        .then((res) => {
                                            console.log(res);
                                        });
                                    setTimeout(() => {
                                        setSaveCheck(false);
                                    }, 1000);
                                }}
                            >
                                <SaveIcon className={classes.marks} />
                            </IconButton>
                            <CircularProgress
                                className={
                                    saveCheck
                                        ? classes.saving
                                        : classes.notSaving
                                }
                                size={20}
                            />
                            <IconButton onClick={() => logout()} className={classes.markButtons}>
                                <ExitToAppIcon className={classes.marks}/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={(event) => {
                            if (isHotkey('mod+s', event)) {
                                event.preventDefault();
                                setSaveCheck(true);
                                axios
                                    .post('/updateNote', {
                                        id: selectedNote._id,
                                        content: JSON.stringify(noteJSON),
                                    })
                                    .then((res) => {
                                        console.log(res);
                                    });
                                setTimeout(() => {
                                    setSaveCheck(false);
                                }, 1000);
                            }
                        }}
                    />
                </Slate>
            )}
        </div>
    );
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const toggleBlock = (editor, format, language) => {
    const isActive = isBlockActive(editor, format);
    const editorId = Math.floor(Math.random() * 1000 + 1);

    Transforms.setNodes(editor, {
        type: isActive ? 'default' : 'code',
        language,
        editorValue: 'starter',
        editorId,
    });
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => n.type === format,
    });

    return !!match;
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const noNoteText = [
    {
        children: [
            {
                text: 'No note selected - Changes will not be saved',
            },
        ],
    },
];

export default TextEditor;
