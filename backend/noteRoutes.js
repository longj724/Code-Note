const express = require('express');
const Note = require('./models/Note');
const User = require('./models/User');
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

    router.post('/addNote', async (req, res) => {
        try {
            const user = await User.findOne({ slug: req.user.slug });
            const note = await Note.createNote({
                user: user,
                folder: req.body.folder,
                content: JSON.stringify(initialValue),
            });
            res.json(note);
        } catch (err) {
            res.json({ error: err.message || err.toString() });
        }
    });

    router.post('/notesInFolder', async (req, res) => {
        try {
            const notes = await Note.find({ folder: req.body.folder });
            res.json(notes);
        } catch (err) {
            res.json({ error: err.message || err.toString() });
        }
    });

    router.post('/updateNote', async (req, res) => {
        try {
            await Note.updateOne(
                { _id: req.body.id },
                { content: req.body.content }
            );
            res.json({ success: 'success'})
        } catch (err) {
            res.json({ error: err.message || err.toString() });
        }
    });

    server.use('/', router);
};

const initialValue = [
    {
        children: [
            {
                text: 'Starter Text',
            },
        ],
    },
];

module.exports = noteApi;
