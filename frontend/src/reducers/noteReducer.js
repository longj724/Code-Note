import {
    CUR_FOLDER_NOTES,
    SELECTED_NOTE,
    CUR_EDITOR_JSON,
    SELECT_NOTE,
} from '../actions/types';

const initialState = {
    notes: [],
    selectedNote: {},
    curEditorJSON: [
        {
            children: [
                {
                    text: 'Starter Text',
                },
            ],
        },
    ],
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
        case CUR_EDITOR_JSON:
            return {
                ...state,
                curEditorJSON: action.payload,
            };
        case SELECT_NOTE:
            return {
                ...state,
                notes: action.payload
            }
        default:
            return state;
    }
};
