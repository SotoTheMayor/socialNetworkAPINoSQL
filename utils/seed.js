const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { randomName, randomThought } = require('./data');

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
    for (let i=0; i<10; i++) {
        const username = randomName();
        const email = `whatever@aol.com`
        users.push({
            username,
            email,
        })
    }

    const thoughts = [] 
    for (let i=0; i<users.length; i++) {
        const username = users[i].username;
        // const thoughtText = randomThought(2);
        const thoughtText = randomThought();
        thoughts.push({
            username,
            thoughtText,
        })
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding Complete 🌱')
    process.exit(0);

})