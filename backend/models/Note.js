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
    title: {
        type: String,
        default: 'undefined'
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
    static async createNote({user, folder, content}) {

        if (user) {
            const newNote = await this.create({
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

mongoSchema.loadClass(NoteClass)

const Note = mongoose.model('Note', mongoSchema);

module.exports = Note;
