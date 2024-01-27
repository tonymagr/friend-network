const express = require('express');
const mongoose = require("mongoose");
const db = require('./config/connection');

const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Creates a new user
app.post('/new-user', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log('Could not create user');
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Finds all users
app.get('/all-users', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Could not find user');
    res.status(500).json({ error: 'Error finding user' });
  }
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});