const passport = require('passport');
const Strategy = require('passport-github').Strategy;
const User = require('./models/User');
const request = require('request');
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000/HomePage';

const auth = ({ ROOT_URL, server }) => {
    const verify = async (accesToken, refreshToken, profile, verified) => {
        let email;
        let avatarUrl;

        if (profile.email) {
            email = profile.email;
        }

        if (profile.avatarUrl) {
            avatarUrl = profile.avatarUrl;
        }

        try {
            const user = await User.signInOrSignUp({
                githubId: profile.id,
                email,
                githubToken: { accesToken, refreshToken },
                displayName: profile.displayName,
                avatarUrl,
            });
            verified(null, user);
        } catch (err) {
            verified(err);
            console.log(err);
        }
    };

    passport.use(
        new Strategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: `${ROOT_URL}/oauth2callback`,
            },
            verify
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, User.publicFields(), (err, user) => {
            done(err, user);
        });
    });

    server.use(passport.initialize());
    server.use(passport.session());

    server.get(
        '/auth/github',
        passport.authenticate('github', {
            scope: ['user'],
        })
    );

    server.get(
        '/oauth2callback',
        passport.authenticate('github', {
            failureRedirect: 'http:/localhost:3000/',
            successRedirect: CLIENT_HOME_PAGE_URL,
        })
    );

    server.get('/logout', (req, res) => {
        req.logout();
        res.redirect('http://localhost:3000/');
    });
};

module.exports = auth;
