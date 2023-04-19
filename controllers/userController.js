const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then( async (user) => 
            !user 
                ? res.status(404).json({ message: 'No user with that ID'}) 
                : res.json({user})
        )
        .catch((err) => res.status(500).json(err))
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user found with that ID' })
            : res.status(200).json({ message: `User ${user.username} updated` })
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user 
            ? res.status(404).json({ message: 'No user with that ID'}) 
            : Thought.deleteMany({ _id: { $in: user.thoughts} })
        )
        .then(() => res.json({ message: 'User and associated thoughts and reactions deleted'}))
        .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )
        .catch((err) => res.status(500).json(err));
        User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { friends: req.params.userId } },
            { runValidators: true, new: true },
            )
        .then(() => res.json({ message: 'New friend added'}))
        .catch((err) => res.status(500).json(err));
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )
        .catch((err) => res.status(500).json(err));
        User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.userId } },
            { runValidators: true, new: true },
            )
        .then(() => res.json({ message: 'Removed former friend'}))
        .catch((err) => res.status(500).json(err));
    },
};