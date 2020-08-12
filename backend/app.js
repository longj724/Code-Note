const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const bodyParser = require('body-parser');
const auth = require('./github');
const noteApi = require('./noteRoutes');
const path = require('path')

require('dotenv').config();

const port = process.env.PORT || 5000;
const ROOT_URL = `http://localhost:${port}`;

const MONGO_URL = process.env.MONGO_URL_TEST;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options);

// Configuring MongoDB session store

const MongoStore = mongoSessionStore(session);

const sess = {
    name: 'codeNote.sid',
    secret: 'HD2w.)q*VqRT4/#NK2M/,E^B)}FED5fWU!dKe[wk',
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
    },
};

const server = express();
server.use(cors({ credentials: true }));

server.use(session(sess));
server.use(bodyParser.json());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../frontend/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

auth({ server, ROOT_URL });
noteApi(server);

server.get('/checkAuth', async (req, res) => {
    if (req.user) {
        res.send({ 'auth': true })
    } else {
        res.send({ 'auth': false })
    }
})

server.listen(port, () => console.log(`Listening on port ${port}`));
