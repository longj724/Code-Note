import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from './HomePage'

const Login = () => {
    return (
            <CssBaseline>
                <div style={{ textAlign: 'center', margin: '0 20px' }}>
                    <br />
                    <p
                        style={{
                            margin: '45px auto',
                            fontSize: '44px',
                            fontWeight: '400',
                        }}
                    >
                        Log in
                    </p>
                    <p>
                        You’ll be logged in for 14 days unless you log out
                        manually.
                    </p>
                    <br />
                    {/* <Link to="/HomePage">
                        <Button variant="contained">Log in with Github</Button>
                    </Link> */}
                    <a href="http://localhost:5000/auth/github">
                        Login
                    </a>
                </div>
            </CssBaseline>
    );
};

export default Login;
