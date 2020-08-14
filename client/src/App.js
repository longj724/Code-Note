import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './CSS/theme'

import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline />
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/HomePage" exact component={HomePage} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
