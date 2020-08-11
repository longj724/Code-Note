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
            backgroundColor: '#bdbdbd',
        },
        borderRadius: '10px',
    },
    form: {},
    addFolderModal: {
        width: '30vw',
        height: '30vh',
        backgroundColor: '#fff',
        marginLeft: '35vw',
        marginTop: '35vh',
        textAlign: 'center',
    },
    modalInput: {
        marginTop: '20px',
        marginBottom: '30px'
    },
    addFolderSubmit: {
        display: 'block',
        margin: 'auto',
    },
}));

export default useStyles;
