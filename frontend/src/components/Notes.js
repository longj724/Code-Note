import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getSelectedNote,
    notesInFolder,
    selectNote,
    deleteSelectedNote,
    updateNotesInFolder
} from '../actions/noteActions';
import axios from 'axios';
import _ from 'lodash'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import useStyles from '../CSS/noteStyles'

const Notes = () => {
    const classes = useStyles();

    const notes = useSelector((state) => state.notes.notes);
    const selectedNote = useSelector((state) => state.notes.selectedNote);
    const dispatch = useDispatch();

    const displayNote = (event) => {
        event.persist();
        const value = event.currentTarget.dataset.value;
        const updatedNotes = notes.map((note) =>
            note._id === value
                ? { ...note, selected: true }
                : { ...note, selected: false }
        );
        dispatch(selectNote(updatedNotes));
        dispatch(getSelectedNote(value, notes));
    };

    const addNote = () => {
        const folder = notes[0].folder;
        axios
            .post('/addNote', {
                folder: folder,
            })
            .then((res) => {
                console.log(res);
            });
        dispatch(notesInFolder(folder));
    };

    const deleteNote = () => {
        if (_.isEmpty(selectedNote)) {
            window.alert('No note selected')
        } else {
            window.alert(
                'Are you sure you want to delete the selected note?'
            );
            axios.post('/deleteNote', {
                id: selectedNote._id
            }).then((res) => {
                console.log(res)
            })

            const updatedNotes = notes.filter((note) => !(note._id === selectedNote._id))
            dispatch(updateNotesInFolder(updatedNotes))
            dispatch(deleteSelectedNote())
        }
    }

    return (
        <div>
            <List>
                <form
                    noValidate
                    autoComplete="off"
                    className={classes.searchNote}
                >
                    <TextField
                        label="Search Notes"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
                {notes.length > 0 ? (
                    notes.map((note) => {
                        return (
                            <ListItem
                                button
                                onClick={displayNote}
                                data-value={note._id}
                                className={classes.note}
                                key={note._id}
                            >
                                <ListItemText
                                    primary={note.title}
                                    className={
                                        note.selected
                                            ? classes.noteBtnTextSelected
                                            : classes.noteBtnTextReg
                                    }
                                />
                            </ListItem>
                        );
                    })
                ) : (
                    <Typography
                        variant="body1"
                        display="block"
                        className={classes.noNotes}
                    >
                        No Notes
                    </Typography>
                )}
                <IconButton onClick={addNote} className={classes.addNoteButton}>
                    <AddCircleIcon className={classes.addNote} />
                </IconButton>
                <Typography variant="body1" display="inline">
                    Add Note
                </Typography>
                <br />
                <IconButton edge="end" className={classes.deleteFolderBtn} onClick={deleteNote}>
                    <DeleteIcon
                        className={classes.deleteFolder}
                    />
                </IconButton>
                <Typography
                    display="inline"
                    variant="button"
                    style={{ color: '#000', marginLeft: '19px' }}
                >
                    Delete Note
                </Typography>
            </List>
        </div>
    );
};

export default Notes;
