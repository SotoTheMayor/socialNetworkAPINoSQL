const { User, Thought } = require('../models');

const friends = async (friendId) =>
    User.aggregate([
        { $match: { _id: ObjectId(friendId) } },
        { $unwind: '$friends'},
        { $group: { 
            _id: ObjectId(friendId),
            friendCount: { $count: '$friends'},
         } }
    ]);


module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then( async (user) => 
            !user 
                ? res.status(404).json({ message: 'No user with that ID'}) 
                : res.json({
                user,
                friends: await friends(req.params.userId)
                })
        )
        .catch((err) => res.status(500).json(err))
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
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
        .then(() => res.json({ message: 'New friend added'}))
        .catch((err) => res.status(500).json(err))
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )
        .then(() => res.json({ message: 'Removed former friend'}))
        .catch((err) => res.status(500).json(err))
    },
};