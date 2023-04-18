const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { randomName, randomThought, randomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    if (Thought) {
        await Thought.deleteMany({ });
    }
    if (User) {
        await User.deleteMany({ });
    }

    const users = [];
    const thoughts = []

    for (let i=0; i<10; i++) {
        const username = randomName();
        const thoughtText = randomThought(username);
        const email = randomEmail();
        users.push({
            username,
            email,
        })
        thoughts.push({
            username: thoughtText[0],
            thoughtText: thoughtText[1],
        });
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.log(thoughts[1].username)

    for (let i=0; i<thoughts.length; i++ ) {
        Thought.findOne({ username: thoughts[i].username })
        .then((thought) => console.log(thought))
        .then((thought) => {
         return User.findOneAndUpdate(
            { username: thought.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true },
                );
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
        }
    

    console.table(users);
    console.table(thoughts);
    console.info('Seeding Complete 🌱')
    process.exit(0);

})
