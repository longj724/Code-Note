import { CUR_FOLDER_NOTES } from './types'
import axios from 'axios'

export const notesInFolder = (folder) => dispatch => {
    axios.post('/notesInFolder', {
        folder: folder
    }).then((res) => {
        return res.data
    }).then((notes) => {
        dispatch({
            type: CUR_FOLDER_NOTES,
            payload: notes
        })
    })
}