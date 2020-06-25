import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getSelectedNote, notesInFolder } from '../actions/noteActions';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    addNote: {
        color: '#fff',
        textAlign: 'center',
        backgroundColor: 'red',
    },
}));

const Notes = () => {
    const classes = useStyles();

    const notes = useSelector((state) => state.notes.notes);
    const dispatch = useDispatch();

    const displayNote = (event) => {
        event.persist();
        dispatch(getSelectedNote(event.currentTarget.dataset.value, notes));
    };

    const addNote = () => {
        const folder = notes[0].folder;
        axios.post('/addNote', {
            folder: folder
        }).then((res) => {
            console.log(res)
        })
        dispatch((notesInFolder(folder)))
    }

    return (
        <div>
            <List>
                <ListItem button>
                    <ListItemText
                        primary="Add Note"
                        className={classes.addNote}
                        onClick={addNote}
                    />
                </ListItem>
                {notes.length > 0 ? (
                    notes.map((note) => {
                        return (
                            <ListItem
                                button
                                onClick={displayNote}
                                data-value={note._id}
                            >
                                <ListItemText
                                    primary={note.title}
                                    style={{ color: '#fff' }}
                                />
                            </ListItem>
                        );
                    })
                ) : (
                    <p>No notes</p>
                )}
            </List>
        </div>
    );
};

export default Notes;
