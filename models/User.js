const mongoose = require('mongoose');
const _ = require('lodash');
const generateSlug = require('../utils/slugify');
const { Schema } = mongoose;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const mongoSchema = new Schema({
    githubId: {
        type: String,
        required: true,
        unique: true,
    },
    githubToken: {
        access_token: String,
        refresh_token: String,
        token_type: String,
        expiry_date: Number,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    notes: {
        type: [Schema.Types.ObjectId],
        default: undefined
    },
    displayName: String,
    avatarUrl: String,
});

class UserClass {
    // User's public fields
    static publicFields() {
        return ['id', 'displayName', 'email', 'avatarUrl', 'slug'];
    }

    static async signInOrSignUp({
        githubId,
        email,
        githubToken,
        displayName,
        avatarUrl,
    }) {
        const user = await this.findOne({ githubId }).select(
            UserClass.publicFields().join(' ')
        );

        if (user) {
            const modifier = {};

            if (githubToken.access_token) {
                modifier.access_token = githubToken.access_token;
            }

            if (githubToken.refresh_token) {
                modifier.refresh_token = githubToken.refresh_token;
            }

            if (_.isEmpty(modifier)) {
                return user;
            }

            await this.updateOne({ githubId }, { $set: modifier });
            return user;
        }

        const slug = await generateSlug(this, displayName);

        const newUser = await this.create({
            createdAt: new Date(),
            githubId,
            email,
            githubToken,
            displayName,
            avatarUrl,
            slug,
        });
    }
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;
