import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    searchNote: {
        textAlign: 'center',
        marginBottom: '2vh',
    },
    addNote: {
        fontSize: 50,
        color: '#000',
        textAlign: 'center',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#bdbdbd',
        },
        borderRadius: '10px',
    },
    addNoteButton: {
        color: '#000',
        textAlign: 'center',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
    note: {
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
    noteBtnTextReg: {
        color: '#000',
        '&:hover': {
            borderBottom: '1px solid #000',
        },
    },
    noteBtnTextSelected: {
        color: '#000',
        borderBottom: '1px solid #000',
    },
    noNotes: {
        marginLeft: '1vw',
        marginBottom: '2vh',
        marginTop: '2vh',
    },
}));

export default useStyles;
