const { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
        // .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        thoughts: req.body.thoughts,
        friends: req.body.friends
      });
      // Prevent app crash on email format validation (or other) with await
      await newUser.save();
      if (newUser) {
        res.status(201).json(newUser);
      } else {
        console.log('Could not create user');
        res.status(500).json({ error: 'Error creating user' });
      }
    } catch (err) {
      const result = res.status(500).json(err);
      console.log(result.statusMessage);
    }
  },
  // Update user:  Update base user data and/or add a thought or friend
  async updateUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      // if thought is not already in the array, then add it
      if (!user.thoughts.includes(req.body.thought)) {
        user.thoughts.push(req.body.thought);
      }
      // if friend is not already in the array, then add it
      if (!user.friends.includes(req.body.friend)) {
        user.friends.push(req.body.friend);
      }

      await user.save();
      res.json(user);
    } catch (err) {
      const result = res.status(500).json(err);
      console.log(result.statusMessage);
    }
  },
  // Delete user
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.json(deletedUser);
      
    } catch (err) {
      result = res.status(500).json(err);
    }
  },
  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // if friend is not already in the array, then add it
      if (!user.friends.includes(req.params.friendId)) {
        user.friends.push(req.params.friendId);
      }

      await user.save();
      res.json(user);
    } catch (err) {
      const result = res.status(500).json(err);
      console.log(result.statusMessage);
    }
  },
  // Remove a friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // Find index of parameter friend id in user document array.
      // If not found, error. If found, delete array item by index
      const index = user.friends.indexOf(req.params.friendId);
      if (index === -1) {
        return res.status(404).json({ message: 'No friend with that ID' });
      } else {
        user.friends.splice(index, 1);
      }

      await user.save();
      res.json(user);
    } catch (err) {
      const result = res.status(500).json(err);
      console.log(result.statusMessage);
    }
  },
}
