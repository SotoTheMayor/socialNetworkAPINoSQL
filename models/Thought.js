const { Schema, model, get } = require('mongoose');
const { User } = require('../models');
const dayjs = require('dayjs');

//subdocument reaction for users reacting to other user (or their own) thoughts
const reactionSchema = new Schema(
    {
        reactionId: [{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        }],
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (now) => dayjs(now).format('MM/DD/YYYY at hh:mm A'),
        },
    },
    {
        toJSON: {
            getters: true,
        }
    },
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (now) => dayjs(now).format('MM/DD/YYYY at hh:mm A'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        }
    },
);

//counts up total reactions and adds to thought collection
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;