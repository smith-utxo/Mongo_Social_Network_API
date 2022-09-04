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
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
// create a new thought with parameter and body. 
createNewThought({ body }, res) {
  Thought.create(body)
    .then((dbThoughtData) => {
      return User.findOneAndUpdate(
        { username: body.username },
        { $push: { Thoughts: dbThoughtData } },
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
  Thought.findOneAndUpdate({ _id: params.id }, body,
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
  Thought.findOneAndDelete({ _id: params.id })
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
deleteReaction({ params, body}, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: body.reactionId } } },
    {
      new: true,
      runValidators: true
    })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "no reaction with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
}
}

module.exports = thoughtController;