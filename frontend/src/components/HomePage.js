import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextEditor from './TextEditor';
import axios from 'axios';

import Folders from './Folders';

const useStyles = makeStyles({
    divs: {
        height: '100vh',
    },
    div1: {
        backgroundColor: '#222751',
    },
    div2: {
        backgroundColor: '#282e5e',
    },
    div3: {
        backgroundColor: '#eee',
    },
});

const HomePage = () => {
    const classes = useStyles();
    const [auth, setAuth] = useState(true);

    useEffect(() => {
        // axios.get('/auth/github')
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((res) => {
        //         console.log('res is', res);
        //         if (res.loggedIn === 'true') {
        //             setAuth(true);
        //         }
        //     });
        // axios.get('/testing').then((res) => {
        //     console.log(res);
        // });
    }, []);

    return (
        <div>
            {auth ? (
                <Grid container className={classes.divs}>
                    <Grid item xs={3} className={classes.div1}>
                        <Folders />
                    </Grid>
                    <Grid item xs={3} className={classes.div2}></Grid>
                    <Grid item xs={6} className={classes.div3}>
                        <TextEditor />
                    </Grid>
                </Grid>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    );
};

export default HomePage;
