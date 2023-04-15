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
]

const reactions = [
    'Wow',
    'Amazing',
    'You have to be joking!',
    'No way thats true',
    `I don't believe you`,
    `I don't have the words`,
    'My mom says that too',
    `You're incredible`,
    `I've heard that before`
]

const users = [];

const randomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomName = () => {
    `${randomArrItem(firstNames)} ${randomArrItem(lastNames)}`;
}

const randomReaction = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            modelQuality1: ' mQ1 ',
            reaction: randomArrItem(reactions),
            modelQuality2: ' mQ2 ',
            // tags: [...reactionTags(2)],
        });
        return results;
    }
}

// const reactionTags = (int) => {
//     if (int === 1) {
//         return randomArrItem(tags);
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

module.exports = { randomName, randomReaction}