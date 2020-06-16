const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const mongoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    folder: {
        type: String,
        required: true,
        default: 'root',
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

class NoteClass {
    static async createNote({githubId, folder, content}) {
        const user = await this.findOne({ githubId });

        if (user) {
            const newNote = await this.createNote({
                createdAt: new Date(),
                content: content,
                folder: folder,
                userId: user._id,
            });

            return newNote;
        }
        return null;
    }
}

const Note = mongoose.model('Note', mongoSchema);

module.export = Note;
