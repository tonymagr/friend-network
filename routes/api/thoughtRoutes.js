const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts);

// /api/thoughts/:id
router.route('/:id').get(getSingleThought);

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

module.exports = router;
