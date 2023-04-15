const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought 
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'Thought created, but no user found with that ID'})
                : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.applicationId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID'})
            : res.json(thought)
        )
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought found with this ID'})
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'Thought created, but no user found with that ID'})
                : res.json('Thought deleted')
        )
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new:true },
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
}