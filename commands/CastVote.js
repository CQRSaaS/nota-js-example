class CastVote {
  constructor(referendumId, voterId, vote) {
    this.referendumId = referendumId;
    this.voterId = voterId;
    this.vote = vote;
  }
};

module.exports = CastVote;