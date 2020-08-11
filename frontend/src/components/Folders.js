import React, { useState, useEffect } from 'react';

// Material-ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from '../CSS/folderStyles';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { notesInFolder, deleteNotesInFolder } from '../actions/noteActions';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const Folders = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const [folders, setFolders] = useState([]);
    const [folderName, setfolderName] = useState('');

    const notes = useSelector((state) => state.notes.notes);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/addFolder', {
            folder: folderName,
        });
        setFolders(() => {
            folders.push({ folder: folderName, selected: false });
            return folders;
        });
    };

    const handleChange = (event) => {
        setfolderName(event.target.value);
    };

    const getNotes = (event) => {
        event.persist();
        const value = event.currentTarget.dataset.value;
        const newFolders = folders.map((folder) =>
            folder.folder === value
                ? { ...folder, selected: true }
                : { ...folder, selected: false }
        );
        setFolders(newFolders);
        dispatch(notesInFolder(value));
    };

    const deleteFolder = () => {
        if (notes.length === 0) {
            window.alert('No folder selected');
        } else {
            window.alert(
                'Are you sure you want to delete the selected folder?'
            );
            axios.post('/deleteFolder', { folder: notes[0].folder });
            setFolders(() =>
                folders.filter((val) => !(val.folder === notes[0].folder))
            );
            dispatch(deleteNotesInFolder());
        }
    };

    useEffect(() => {
        axios
            .get('/folders')
            .then((res) => {
                return res.data;
            })
            .then((res) => {
                if (!res.user) {
                    window.alert(
                        'Practice Environment, You are not logged in.'
                    );
                }
                const folderObject = res.folders.map((folder) => {
                    return { folder: folder, selected: false };
                });
                setFolders(folderObject);
            });
    }, []);

    const modalBody = (
        <div className={classes.addFolderModal}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    id="outlined-basic"
                    label="Folder Name"
                    variant="outlined"
                    onChange={handleChange}
                    className={classes.modalInput}
                />
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.addFolderSubmit}
                    disableElevation
                >
                    Submit
                </Button>
            </form>
        </div>
    );

    return (
        <div>
            <List style={{ marginTop: '0px' }}>
                {folders.map((folderObj) => {
                    return (
                        <ListItem
                            button
                            onClick={getNotes}
                            data-value={folderObj.folder}
                            className={classes.folderButton}
                            key={folderObj.folder}
                        >
                            <ListItemIcon>
                                <FolderIcon style={{ color: '#0166FF' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="h6">
                                        {folderObj.folder}
                                    </Typography>
                                }
                                value={folderObj.folder}
                                className={
                                    folderObj.selected
                                        ? classes.folderBtnTextSelected
                                        : classes.folderBtnTextReg
                                }
                            />
                        </ListItem>
                    );
                })}
                <IconButton onClick={handleOpen}>
                    <AddCircleIcon className={classes.addFolder} />
                </IconButton>
                <Typography
                    display="inline"
                    variant="button"
                    style={{ color: '#fff' }}
                >
                    Add Folder
                </Typography>
                <br />
                <IconButton edge="end" onClick={deleteFolder}>
                    <DeleteIcon className={classes.deleteFolder} />
                </IconButton>
                <Typography
                    display="inline"
                    variant="button"
                    style={{ color: '#fff', marginLeft: '19px' }}
                >
                    Delete Folder
                </Typography>
            </List>
            <Modal open={open} onClose={handleClose}>
                {modalBody}
            </Modal>
        </div>
    );
};

export default Folders;
