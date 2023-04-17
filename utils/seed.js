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
            thoughts: {
                _id: thoughtText[2],
                thoughtText: thoughtText[1],
            }
        })
        thoughts.push({
            _id: thoughtText[2],
            username: thoughtText[0],
            thoughtText: thoughtText[1],
        });
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding Complete 🌱')
    process.exit(0);

})