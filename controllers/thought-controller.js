const { Thought, User } = require('../models')

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
    .select('-__v')
    .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err))
  },

  getThoughtById ({ params }, res){
    Thought.findOne({ _id: params.thoughtId })
    .select('-__v')
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id'})
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.status(400).json(err))
  },

  addThought({ params, body }, res) {
    console.log(body)
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: {thoughts: _id } },
          { new: true}
        )
      })
      .then(dbThoughtData  => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No User found with this Id' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.json(err))
  },

  updateThought({ params, body }, res) {
    console.log(body)
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      body,
      { new: true, runValidators: true}
    )
      .then(dbThoughtData  => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.json(err))
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if(!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id' })
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { comments: params.thoughtId }},
          { new: true }
        )
      })
      .then(dbThoughtData => {
        if(!dbThoughtData){
          res.status(404).json({ message: 'No User found with this id' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.json(err))
  },

  addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbReactionData => {
        if(!dbReactionData) {
          res.status(404).json({ message: 'No Thought found with this id' })
          return
        }
        res.json(dbReactionData)
      })
      .catch(err => res.json(err))
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
}

module.exports = thoughtController