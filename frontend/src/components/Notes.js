import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getSelectedNote } from '../actions/noteActions'

const Notes = () => {
    const notes = useSelector((state) => state.notes.notes);
    const dispatch = useDispatch();

    const displayNote = (event) => {
        event.persist()
        dispatch((getSelectedNote(event.currentTarget.dataset.value, notes)))
    };

    return (
        <div>
            <List>
                {notes.length > 0 ? (
                    notes.map((note) => {
                        return (
                            <ListItem button onClick={displayNote} data-value={note._id}>
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
