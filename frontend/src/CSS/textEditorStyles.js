import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    marks: {
        fontSize: 25,
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#bdbdbd',
        },
        borderRadius: '5px',
    },
    marksSelected: {
        fontSize: 25,
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
        width: '78px',
        backgroundColor: '#000',
        '&:hover': {
            backgroundColor: '#bdbdbd',
        },
    },
    addEditorTxt: {
        lineHeight: '1.4 !important',
        color: '#fff',
    },
}));

export default useStyles;