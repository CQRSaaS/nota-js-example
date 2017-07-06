const ElectionAdminAppointed = require('./ElectionAdminAppointed')
const ElectionAdminCreated = require('./ElectionAdminCreated')
const OrganizationCreated = require('./OrganizationCreated')
const PollsClosed = require('./PollsClosed')
const PollsOpened = require('./PollsOpened')
const ReferendumCreated = require('./ReferendumCreated')
const ReferendumDeleted = require('./ReferendumDeleted')
const VoteCast = require('./VoteCast')
const VoterAuthenticated = require('./VoterAuthenticated')
const VoterHasVoted = require('./VoterHasVoted')
const VoterRegistered = require('./VoterRegistered')

module.exports = {
  ElectionAdminAppointed,
  ElectionAdminCreated,
  OrganizationCreated,
  PollsClosed,
  PollsOpened,
  ReferendumCreated,
  ReferendumDeleted,
  VoteCast,
  VoterAuthenticated,
  VoterHasVoted,
  VoterRegistered
}
