import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    editorLangForm: {
        marginLeft: '10px',
        marginRight: '10px',
        width: '9vw',
        minWidth: '70px'
    },
    marks: {
        fontSize: 20,
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#bdbdbd',
        },
        borderRadius: '5px',
    },
    marksSelected: {
        fontSize: '1.4vw',
        backgroundColor: '#bdbdbd',
        borderRadius: '5px'
    },
    markButtons: {
        color: '#000',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
    addEditor: {
        height: '40px',
        width: '4.75vw',
        backgroundColor: '#000',
        '&:hover': {
            backgroundColor: '#bdbdbd',
        },
        marginRight: '10px'
    },
    addEditorTxt: {
        lineHeight: '1.4 !important',
        color: '#fff',
    },
    notUpdatingTitle: {
        color: '#000',
        display: 'none',
    },
    updatingTitle: {
        color: '#000',
    }
}));

export default useStyles;