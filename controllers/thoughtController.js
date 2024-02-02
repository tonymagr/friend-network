const { Thought, User } = require('../models');
const { Schema, model } = require('mongoose');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        // .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new thought
  async createThought(req, res) {
    try {
      const newThought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        userId: req.body.userId,
        reactions: req.body.reactions
      });
      const thoughtRes = await newThought.save();

      // Push the created thought's _id to the associated user's thoughts array field
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // if thought is not already in the array, then add it
      if (!user.thoughts.includes(thoughtRes.id)) {
        user.thoughts.push(thoughtRes.id);
      }
      await user.save();

      if (newThought) {
        res.status(201).json(newThought);
      } else {
        console.log('Could not create thought');
        res.status(500).json({ error: 'Error creating thought' });
      }
    } catch (err) {
      const result = res.status(500).json(err);
      console.log(result.statusMessage);
    }
  },
  // Update thought:  Update base thought data and/or add a thought or friend
  async updateThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      if (req.body.thoughtText) {
        thought.thoughtText = req.body.thoughtText;
      }

      await thought.save();
      res.json(thought);
    } catch (err) {
      const result = res.status(500).json(err);
      console.log(result.statusMessage);
    }
  },
  // Delete thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Also delete thought id from user array who posted thought 
      const user = await User.findById(deletedThought.userId);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // Find index of parameter friend id in user document array.
      // If not found, error. If found, delete array item by index
      const index = user.thoughts.indexOf(req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: 'No thought with that ID' });
      } else {
        user.thoughts.splice(index, 1);
      }
      await user.save();
      
      res.json(deletedThought);
    } catch (err) {
      result = res.status(500).json(err);
    }
  },
  // Create reaction: Add one of possibly many reactions to a thought
  async createReaction(req, res) {

    let reactionData = {
      reactionBody: req.body.reactionBody,
      username: req.body.username,
    };
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      thought.reactions.push(reactionData);      
      await thought.save();
      res.json(thought);
    } catch (err) {
      const result = res.status(500).json(err);
      console.log(result.statusMessage);
    }
  },
  // Delete reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Find index of parameter reaction id in thought document array.
      // If not found, error. If found, delete array item by index.
      // Used basic for loop instead of indexOf, because object key to compare is in reactions array.
      for (let index = 0; index <= thought.reactions.length; index++) {
        if (index === thought.reactions.length) {
          return res.status(404).json({ message: 'No reaction with that ID' });
        }
        if (thought.reactions[index].id === req.params.reactionid) {
          thought.reactions.splice(index, 1);
          break;
        }
      }

      await thought.save();
      res.json(thought);
    } catch (err) {
      const result = res.status(500).json(err);
      console.log(result.statusMessage);
    }
  },
};
