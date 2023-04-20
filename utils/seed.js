const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { randomName, randomThought, randomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    //drops prior db data
    if (Thought) {
        await Thought.deleteMany({ });
    }
    if (User) {
        await User.deleteMany({ });
    }

    const users = [];
    const thoughts = []
    
    //loops through seed data in data.js
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

    //adds seed data to collections
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.log(thoughts[1].username)

    //adds thought ids to users
    for (let i=0; i<thoughts.length; i++ ) {
        await Thought.collection.findOne({ username: thoughts[i].username })
        .then((thought) => {
            return User.collection.findOneAndUpdate(
            { username: thought.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true },
                );
            })
            .catch((err) => {
                console.log(err);
            })
        }
    

    console.table(users);
    console.table(thoughts);
    console.info('Seeding Complete 🌱')
    process.exit(0);

})
