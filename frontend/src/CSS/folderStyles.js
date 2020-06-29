import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    addFolder: {
        color: '#fff',
        fontSize: 50,
        '&:hover': {
            backgroundColor: '#bdbdbd',
        },
        borderRadius: '10px',
        display: 'block',
    },
    folderButton: {
        backgroundColor: 'primary',
    },
    folderBtnTextReg: {
        color: '#fff',
        '&:hover': {
            borderBottom: '1px solid #fff',
        },
        fontWeight: 'bold',
    },
    folderBtnTextSelected: {
        color: '#fff',
        borderBottom: '1px solid #fff',
        fontWeight: 'bold',
    },
    deleteFolder: {
        color: '#0166FF',
        display: 'block',
        fontSize: 40,
        backgroundColor: '#000',
        '&:hover': {
            backgroundColor: '#bdbdbd'
        },
        borderRadius: '10px'
    },
    modal: {
        position: 'absolute',
        width: '20vw',
        height: '20vh',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        display: 'block',
    },
}));

export default useStyles;
