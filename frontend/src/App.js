import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';

import { Provider } from 'react-redux';

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/HomePage" exact component={HomePage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
