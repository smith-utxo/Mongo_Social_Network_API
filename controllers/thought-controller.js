const { Thought, User } = require('../models');

const thoughtController = {
  // Get all Thought 
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(400).json(err));
      },
  // Get a thought by an id that is passed as a parameter
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'user',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  },
  // create a new thought with parameter and body. 
  createNewThought({ body }, res) {
    Thought.create(body)
    .then(( _id) => {
        return User.findOneAndUpdate(
          { username: body.userId },
          { $push: { Thoughts: thoughts_id } },
          { new: true }
    );
        })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this username!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // Update or Edit a thought
  editThought({ params, body }, res) {
    Thought.FindOneAndUpdate({ _id: params.id }, body,
      {
        new: true,
        runValidators: true
      }
    )
      .then(editedThought => {
        if (!editedThought) {
          res.status(404).json({ message: 'There is no thought with this Id!' });
          return;
        }
        res.json(editedThought);
      })
      .catch(err => res.json(err));
  },
  // Delete a thought
  deleteThought({ params }, res) {
    Thought.FindOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought with this id!' });
          return;
        }
        res.json({ message: 'Thought Successfully Deleted!' });
      })
      .catch(err => res.json(err));
  },
  // create a reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      {
        new: true,
        runValidators: true
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this Id!' })
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  // Delete a reaction 
  deleteReaction({ params, body }, res) {
    Thought.FindOneAndDelete(
      { _id: params.reactionId },
      { $pull: { reactions: body } },
      {
        new: true,
        runValidators: true
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Reaction with this Id!' })
          return;
        }
        res.json({ message: 'Reaction successfully deleted!' });
      })
      .catch(err => res.json(err));
  }
}

module.exports = thoughtController;