import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import TextEditor from './TextEditor';
import Folders from './Folders';
import Notes from './Notes';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    divs: {
        height: '100vh',
    },
    div1: {
        backgroundColor: '#000',
    },
    div2: {
        backgroundColor: '#fff',
        borderRight: '1px solid #000',
    },
    div3: {
        backgroundColor: '#eee',
    },
});

const HomePage = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.divs}>
                <Grid item xs={3} className={classes.div1}>
                    <Folders />
                </Grid>
                <Grid item xs={3} className={classes.div2}>
                    <Notes />
                </Grid>
                <Grid item xs={6} className={classes.div3}>
                    <TextEditor />
                </Grid>
            </Grid>
        </div>
    );
};

export default HomePage;
