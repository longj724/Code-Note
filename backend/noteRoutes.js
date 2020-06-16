const express = require('express');
const Note = require('./models/Note');
const router = express.Router();

const noteApi = (server) => {
    router.get('/folders', async (req, res) => {
        try {
            const folders = await Note.distinct('folder');
            res.json({ folders });
        } catch (err) {
            res.json({ error: err.message || err.toString() });
        }
    });

    router.get('/addNote', async (req, res) => {
        try {
            Note.createNote({githubId: req.user.githubId, folder: 'fadl', content: initialValue})
        } catch {
            res.json({ error: err.message || err.toString() });
        }
    })

    server.use('/', router)
};

const initialValue = [
    {
        children: [
            {
                text:
                    'Starter Text',
            },
        ],
    },
];

module.exports = noteApi
