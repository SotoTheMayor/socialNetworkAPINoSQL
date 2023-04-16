const { Schema, model } = require('mongoose');
const { Thought } = require('../models')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // mongoose email validator,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        // thoughts: [Thought],
    },
    {
        toJSON: {
            getters: true,
        }
    },
);

const User = model('user', userSchema);

module.exports = User;