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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
    },
    {
        toJSON: {
            getters: true,
        }
    },
);

userSchema.virtual('totalFriends')
    .get(function () {
        return this.friends.length;
    })

const User = model('user', userSchema);

module.exports = User;