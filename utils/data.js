const firstNames = [
    'Jason',
    'Jack',
    'Abbigail',
    'Cory',
    'Elizabeth',
    'Andrew',
    'Elijah',
    'Dave',
    'Jessica',
    'Lorie',
    'Fred',
    'Francis',
    'George'
]

const lastNames = [
    'Johnson',
    'Smith',
    'Williams',
    'Andrews',
    'Lewis',
    'Sotomayor',
    'Alito',
    'Rehnquist',
    'Ginsburg',
    'Franklin',
    'Brock',
    'Norris',
    'Overmeyer',
    'Hall',
    'Reed'
];

const thoughts = [
    'Why is there still snow on the ground?!?!',
    'Soccer is the BEST sport, hands down',
    'I have opinions, and one of them is that your opinions stink',
    `I'd like to visit South America one day`,
    `I cannot WAIT to get outside and backpack`,
    `Why aren't there more blue cakes? I could go for blue cake.`,
    `My mom says I'm special`,
    `Whoever says the Great British Bakeoff isn't the best show ever made is a LIAR`,
    `Has there been any more information about that one political thing yet?`
];

const emailAddress = [
    'none',
    'jazzy',
    'whatever',
    'email',
    'justanotheremail',
    'quickfire',
    'monster',
    'philodendron',
    'monstera',
    'pothos',
];

const emailDomain = [
    'none',
    'gmail',
    'yahoo',
    'aol',
    'msn',
    'plants',
    'moreplants',
    'idontknow',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j'
];

const randomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomName = () => 
    `${randomArrItem(firstNames)} ${randomArrItem(lastNames)}`;

const randomEmail = () =>
    `${randomArrItem(emailAddress)}@${randomArrItem(emailDomain)}.com`;

const randomThought = (username) => {
    let results = [];
    results = [username, randomArrItem(thoughts)];
        return results;
    }

// const associateUser = (i) => {
//     Thought.findOne({ username: i.username })
//     .then((thought) => console.log(thought))
//     .then((thought) => {
//      return User.findOneAndUpdate(
//         { username: thought.username },
//         { $addToSet: { thoughts: thought._id } },
//         { new: true },
//             );
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         })
// }

// const thoughtReactions = (int) => {
//     if (int === 1) {
//         return randomArrItem(reactions);
//     }
//     const results = [];
//     for (let i = 0; i < int; i++) {
//         results.push({
//             modelQuality1: ' mQ1 ',
//             tagBody: randomArrItem(tags),
//             modelQuality2: ' mQ2 ',
//         });
//         return results;
//     }
// }

module.exports = { randomName, randomThought, randomEmail }