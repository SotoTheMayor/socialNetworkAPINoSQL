const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },

    //get route for single thought using id in url param
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought 
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    //post route for a new thought
    createThought(req, res) {
        User.findOne({ username: req.body.username})
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'Thought created, but no user found with that ID'})
            : res.json('Created the thought')
        );
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //put route for updating an already existing thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID'})
            : res.json(thought)
        )
    },

    //delete route that removes it from the user's thought list too
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
        .then(() => res.json('Thought deleted')
        )
        .catch((err) => res.status(500).json(err));
    },

    //adds a reaction to the individual thought
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

    //delete route for individual reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId} } },
            { runValidators: true, new: true },
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID'})
                : res.status(200).json({ message: 'Reaction deleted' })
        )
        .catch((err) => res.status(500).json(err))
    },
}