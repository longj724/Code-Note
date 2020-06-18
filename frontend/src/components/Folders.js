import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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

const useStyles = makeStyles((theme) => ({
    addNote: {
        color: '#fff',
        textAlign: 'center',
        backgroundColor: 'red',
    },
    modal: {
        position: 'absolute',
        width: '20vw',
        height: '20vh',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        display: 'block',
    },
}));

const Folders = () => {
    const classes = useStyles();

    const [rendered, setRendered] = useState(false);
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState([]);
    const [folderName, setfolderName] = useState('');
    const [modalStyle] = useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('/addNote', {
                folder: folderName,
            })
            .then((res) => {
                return res.data;
            })
            .then((res) => {
                console.log(res.content);
            });
    };

    const handleChange = (event) => {
        setfolderName(event.target.value);
    };

    const getNotes = (event) => {
        event.persist()
        axios.post('/notesInFolder', {
            folder: event.currentTarget.dataset.value
        }).then((res) => {
            return res.data
        }).then((res) => {
            console.log(res.data)
        })
    }

    useEffect(() => {
        axios
            .get('/folders')
            .then((res) => {
                return res.data;
            })
            .then((res) => {
                setFolders(res.folders);
            });
    });

    const modalBody = (
        <div style={modalStyle} className={classes.modal}>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Folder Name"
                    variant="outlined"
                    onChange={handleChange}
                />
                <button type="submit" className={classes.form}>
                    Submit
                </button>
            </form>
        </div>
    );

    return (
        <div>
            <List>
                <ListItem button onClick={handleOpen}>
                    <ListItemText
                        primary="Add Note"
                        className={classes.addNote}
                    />
                </ListItem>
                {folders.map((folderName) => {
                    return (
                        <ListItem button onClick={getNotes} data-value={folderName}>
                            <ListItemText primary={folderName} value={folderName}/>
                        </ListItem>
                    );
                })}
            </List>
            <Modal open={open} onClose={handleClose}>
                {modalBody}
            </Modal>
        </div>
    );
};

export default Folders;
