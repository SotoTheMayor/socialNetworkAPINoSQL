const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { randomName, randomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const thoughts = randomThought(2);

    for (let i=0; i<10; i++) {
        const fullName = randomName();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];

        users.push({
            first,
            last,
        })
    }

    await User.connection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding Complete 🌱')
    process.exit(0);

})