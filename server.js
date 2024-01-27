const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const { User, Thought } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

// // Creates a new user
// app.post('/new-user', (req, res) => {
//   const newUser = new User({
//     username: req.body.username,
//     email: req.body.email,
//     thoughts: req.body.thoughts,
//     friends: req.body.friends
//   });
//   newUser.save();
//   if (newUser) {
//     res.status(201).json(newUser);
//   } else {
//     console.log('Could not create user');
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Finds all users
// app.get('/all-users', async (req, res) => {
//   try {
//     // Using model in route to find all documents that are instances of that model
//     const result = await User.find({});
//     res.status(200).json(result);
//   } catch (err) {
//     console.log('Could not find users');
//     res.status(500).json({ error: 'Error finding users' });
//   }
// });

// // Creates a new thought
// app.post('/new-thought', (req, res) => {
//   const newThought = new Thought({
//     thoughtText: req.body.thoughtText
//     });
//   newThought.save();
//   if (newThought) {
//     res.status(201).json(newThought);
//   } else {
//     console.log('Could not create thought');
//     res.status(500).json({ error: 'Error creating thought' });
//   }
// });

// // Finds all thoughts
// app.get('/all-thoughts', async (req, res) => {
//   try {
//     // Using model in route to find all documents that are instances of that model
//     const result = await Thought.find({});
//     res.status(200).json(result);
//   } catch (err) {
//     console.log('Could not find thoughts');
//     res.status(500).json({ error: 'Error finding thoughts' });
//   }
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});