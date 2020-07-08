import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    divs: {
        height: '100vh',
    },
    div1: {
        backgroundColor: '#fff',
    },
    div2: {
        backgroundColor: '#000',
    },
    titleText: {
        marginRight: '1vw',
        marginLeft: '1vw',
        marginTop: '25vh',
        marginBottom: '3vh',
        fontSize: '40px',
        fontWeight: '400',
    },
    subText: {
        marginBottom: '1vh',
    },
    loginButton: {},
});

const Login = () => {
    const classes = useStyles();

    return (
        <CssBaseline>
            <Grid container className={classes.divs}>
                <Grid item xs={6} className={classes.div1}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <br />
                        <Typography variant="h5" className={classes.titleText}>
                            Log in with Github to access Code Note
                        </Typography>
                        <Typography variant="body1" className={classes.subText}>
                            You’ll be logged in for 14 days unless you log out
                            manually.
                        </Typography>
                        <br />
                        <Button
                            variant="contained"
                            href="http://localhost:5000/auth/github"
                            disableElevation
                            className={classes.loginButton}
                        >
                            Login
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6} className={classes.div2}></Grid>
            </Grid>
        </CssBaseline>
    );
};

export default Login;
