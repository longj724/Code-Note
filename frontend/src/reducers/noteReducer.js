import { CUR_FOLDER_NOTES, SELECTED_NOTE } from '../actions/types';

const initialState = {
    notes: [],
    selectedNote: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CUR_FOLDER_NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        case SELECTED_NOTE:
            return {
                ...state,
                selectedNote: action.payload,
            };
        default:
            return state;
    }
};
