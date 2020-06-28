import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        action: {
            selected: '#fff',
        },
        primary: {
            light: '#1F1F1F',
            main: '#1414141',
            dark: '#0A0A0A',
        },
    },
    typography: {
        fontFamily: 'Roboto',
        h6: {
            fontWeight: 'bold',
        },
    },
});

export default theme;
