const connection = require('../config/connection');
const { User, Reaction } = require('../models');
const { randomName, randomReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Reaction.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const reactions = randomReaction(2);

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
    await Reaction.collection.insertMany(reactions);

    console.table(users);
    console.table(reactions);
    console.info('Seeding Complete 🌱')
    process.exit(0);

})