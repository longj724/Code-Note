import { CUR_FOLDER_NOTES, SELECTED_NOTE, CUR_EDITOR_JSON } from './types';
import axios from 'axios';

export const notesInFolder = (folder) => (dispatch) => {
    axios
        .post('/notesInFolder', {
            folder: folder,
        })
        .then((res) => {
            return res.data;
        })
        .then((notes) => {
            dispatch({
                type: CUR_FOLDER_NOTES,
                payload: notes,
            });
        });
};

export const getSelectedNote = (id, notes) => (dispatch) => {
    const selectedNote = notes.find((note) => note._id === id);
    dispatch({ type: SELECTED_NOTE, payload: selectedNote });
};

export const setCurEditorValue = (value) => (dispatch) => {
    dispatch({ type: CUR_EDITOR_JSON, payload: value });
};
