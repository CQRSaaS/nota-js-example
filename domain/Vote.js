const CastVote = require('../commands/CastVote')
const VoteCast = require('../events/VoteCast')
const errors = require('../domain/Errors')

class Vote {
  constructor () {
    this.id = null
    this.referendumId = null
    this.vote = null
    this.version = -1
  }

  hydrate (evt) {
    if (evt instanceof VoteCast) {
      this._onVoteCast(evt)
      this.version++
    }
  }

  _onVoteCast (evt) {
    this.referendumId = evt.referendumId
    this.vote = evt.vote
  }

  execute (command) {
    if (command instanceof CastVote) {
      return this._CastVote(command)
    }
    throw new Error('Unknown command.')
  }

  _CastVote (command) {
    var validationErrors = []
    if (this.id) {
      validationErrors.push({'field': '', 'msg': 'Vote already exists.'})
    }
    if (!command.voterId) {
      validationErrors.push({'field': 'voterId', 'msg': 'Voter id is a required field.'})
    }
    if (!command.referendumId) {
      validationErrors.push({'field': 'referendumId', 'msg': 'Referendum id is a required field.'})
    }
    if (!command.vote) {
      validationErrors.push({'field': 'vote', 'msg': 'vote is a required field.'})
    }
    if (validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors)
    }
    return Array.of(
      new VoteCast(command.referendumId, command.vote)
    )
  }
}

module.exports = Vote
