import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Notes = () => {
    const notes = useSelector((state) => state.notes.notes);

    console.log(notes)

    return (
        <div>
            <List>
                {notes.length > 1 ? notes.map((note) => {
                    return (
                        <ListItem button>
                            <ListItemText primary={note.folder} />
                        </ListItem>
                    );
                }) : <p>No notes </p>}
            </List>
        </div>
    );
};

export default Notes;
