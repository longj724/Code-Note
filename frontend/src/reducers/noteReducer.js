import { CUR_FOLDER_NOTES } from '../actions/types'

const initialState = {
    notes: ['1'],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CUR_FOLDER_NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        default:
            return state;
    }
};
