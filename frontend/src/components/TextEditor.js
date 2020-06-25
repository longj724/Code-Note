import React, { useState, useMemo, useCallback, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/monokai';
import isHotkey from 'is-hotkey';
import _ from 'lodash';
import axios from 'axios';

// Slate
import { Editable, withReact, Slate } from 'slate-react';
import { Editor, createEditor, Transforms } from 'slate';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlineIcon from '@material-ui/icons/FormatUnderlined';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { setCurEditorValue } from '../actions/noteActions';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const TextEditor = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedNote = useSelector((state) => state.notes.selectedNote);

    const noteJSON = useSelector((state) => state.notes.curEditorJSON);

    const [language, setLanguage] = useState('javascript');
    const [open, setOpen] = useState(false);
    const [noteTitle, setNoteTitle] = useState('untitled');

    const editor = useMemo(() => withReact(createEditor()), []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const renderElement = useCallback((props) => <Element {...props} />, []);

    useEffect(() => {
        if (!_.isEmpty(selectedNote)) {
            dispatch(setCurEditorValue(JSON.parse(selectedNote.content)));
        }
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
    };

    const updateTitle = (event) => {};

    const Element = (props) => {
        const { attributes, children, element } = props;
        switch (element.type) {
            case 'code':
                return <AceElement {...props} />;
            default:
                return <p {...attributes}>{children}</p>;
        }
    };

    const AceElement = ({ attributes, children, element }) => {
        const noteJSON2 = useSelector((state) => state.notes.curEditorJSON);
        var updatedCode = [];

        const onClick = () => {
            Editor.insertNode(editor, {
                children: [{ text: 'Work' }],
            });
        };

        const handleCodeChange = (newValue, editorId) => {
            updatedCode = noteJSON2.map((node) => {
                return node.editorId === editorId
                    ? { ...node, editorValue: newValue }
                    : { ...node };
            });
            setTimeout(() => {
                dispatch((setCurEditorValue(updatedCode)))
            }, 2000)
        };

        return (
            <>
                <div contentEditable={false} style={{ marginLeft: '10px' }}>
                    <AceEditor
                        height="250px"
                        mode={element.language}
                        theme="monokai"
                        value={element.editorValue}
                        onChange={(newValue) => handleCodeChange(newValue, element.editorId)}
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
                backgroundColor: 'white',
                minHeight: '50vh',
                width: '50vw',
            }}
        >
            <Slate
                editor={editor}
                value={noteJSON}
                onChange={(newValue) => dispatch(setCurEditorValue(newValue))}
            >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onMouseDown={(event) => {
                                event.preventDefault();
                                toggleMark(editor, 'bold');
                            }}
                        >
                            <FormatBoldIcon />
                        </IconButton>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onMouseDown={(event) => {
                                event.preventDefault();
                                toggleMark(editor, 'underline');
                            }}
                        >
                            <FormatUnderlineIcon />
                        </IconButton>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <FormatItalicIcon />
                        </IconButton>
                        <Button
                            variant="contained"
                            onClick={(event) => {
                                event.preventDefault();
                                toggleBlock(editor, 'code', language);
                            }}
                        >
                            Add Editor
                        </Button>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Language</InputLabel>
                            <Select
                                value={language}
                                onChange={handleChange}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                            >
                                <MenuItem value="javascript">
                                    Javascript
                                </MenuItem>
                                <MenuItem value="html">HTML</MenuItem>
                                <MenuItem value="python">Python</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField id="standard-basic" label="Title" />
                        <Button variant="contained">Update Title</Button>
                    </Toolbar>
                </AppBar>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => {
                        if (isHotkey('mod+s', event)) {
                            event.preventDefault();
                            axios.post('/updateNote', {
                                id: selectedNote._id,
                                content: JSON.stringify(noteJSON),
                            }).then((res) => {
                                console.log(res);
                            });
                        }
                    }}
                    placeholder="Enter some text..."
                />
            </Slate>
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

const initialValue = [
    {
        children: [
            {
                text: 'Starter Text',
            },
        ],
    },
];

export default TextEditor;
