// import commands
const AuthenticateVoter = require('./commands/AuthenticateVoter')
const CastVote = require('./commands/CastVote')
const ClosePolls = require('./commands/ClosePolls')
const CreateElectionAdmin = require('./commands/CreateElectionAdmin')
const CreateOrganization = require('./commands/CreateOrganization')
const CreateReferendum = require('./commands/CreateReferendum')
const DeleteReferendum = require('./commands/DeleteReferendum')
const OpenPolls = require('./commands/OpenPolls')
const RegisterVoter = require('./commands/RegisterVoter')

// import domain
const ElectionAdmin = require('./domain/ElectionAdmin')
const Errors = require('./domain/Errors')
const Organization = require('./domain/Organization')
const PostalAddress = require('./domain/PostalAddress')
const Referendum = require('./domain/Referendum')
const Vote = require('./domain/Vote')
const Voter = require('./domain/Voter')

// import events
const ElectionAdminAppointed = require('./events/ElectionAdminAppointed')
const ElectionAdminCreated = require('./events/ElectionAdminCreated')
const OrganizationCreated = require('./events/OrganizationCreated')
const PollsClosed = require('./events/PollsClosed')
const PollsOpened = require('./events/PollsOpened')
const ReferendumCreated = require('./events/ReferendumCreated')
const ReferendumDeleted = require('./events/ReferendumDeleted')
const VoteCast = require('./events/VoteCast')
const VoterAuthenticated = require('./events/VoterAuthenticated')
const VoterHasVoted = require('./events/VoterHasVoted')
const VoterRegistered = require('./events/VoterRegistered')

const Utils = require('./utils')

const commands = {
  AuthenticateVoter,
  CastVote,
  ClosePolls,
  CreateElectionAdmin,
  CreateOrganization,
  CreateReferendum,
  DeleteReferendum,
  OpenPolls,
  RegisterVoter
}

const domain = {
  ElectionAdmin,
  Errors,
  Organization,
  PostalAddress,
  Referendum,
  Vote,
  Voter
}

const events = {
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

const utils = new Utils()

module.exports = {
  commands,
  domain,
  events,
  utils
}
