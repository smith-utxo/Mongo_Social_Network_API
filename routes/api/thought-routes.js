const router = require('express').Router();

const {
  getAllThoughts,
  createNewThought,
  editThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// get all thoughts 
router
  .route('/')
  .get(getAllThoughts)
  .post(createNewThought);

// get a single thought by id 
router
  .route('/:id')
  .get(getThoughtById)
  .put(editThought)
  .delete(deleteThought);

// create or remove reaction stored in a single thoughts reaction array field
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

router
  .route('/:thoughtId/reactionId')
  .delete(deleteReaction);

module.exports = router; 