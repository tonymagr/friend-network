const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts);

// /api/thoughts/:id
router.route('/:id').get(getSingleThought);

// /api/thoughts
router.route('/').post(createThought);

// /api/thoughts/:id
router.route("/:id").put(updateThought);

// /api/thoughts/:id
router.route("/:id").delete(deleteThought);

// /api/thoughts/:id
router.route("/:id").post(createReaction);

// /api/thoughts/:id/reaction/:reactionid
router.route("/:id/reaction/:reactionid").delete(deleteReaction);

module.exports = router;
