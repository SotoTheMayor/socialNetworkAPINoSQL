const { Schema, model } = require('mongoose');
const { User } = require('../models')

// const reactionSchema = new Schema(
//     {
//         reactionId: {
//             type: String,
//             default: ObjectID,
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxLength: 280,
//         },
//         username: {
//             type: String,
//             required: true,
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             required: true,
//         },
//     },
//     {
//         toJSON: {
//             getters: true,
//         }
//     },
// )

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // trimmed: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        // reactions: [reactionSchema],
    }
);

// thoughtSchema.virtual('reactionCount')
//     .get(function () {
//         return this.reactions.length;
//     })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;