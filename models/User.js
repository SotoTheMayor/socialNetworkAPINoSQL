const { Schema, model } = require('mongoose');
const { Thought } = require('../models')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            // unique: true,
            // trimmed: true,
        },
        email: {
            type: String,
            required: true,
            // unique: true,
            // mongoose email validator,
        },
        // thoughts: [Thought],
        // friends: [_id],
    },
    {
        toJSON: {
            getters: true,
        }
    },
);

// userSchema.virtual('friendCount')
//     .get(function () {
//         return this.friends.length;
//     })

const User = model('user', userSchema);

module.exports = User;