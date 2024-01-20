const connection = require('../config/connection');
const { User } = require('../models');
// const { getRandomName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collection if it exists
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];

  // for (let i = 0; i < 20; i++) {
  //   const fullName = getRandomName();
  //   const first = fullName.split(' ')[0];
  //   const last = fullName.split(' ')[1];

    // users.push({
    //   first,
    //   last,
    //   age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    // });
  // }

  await User.collection.insertMany(users);
  // await Application.collection.insertMany(applications);

  console.table(users);
  console.info('Seeding complete! 🌱');
  // process.exit(0);
});
