//import commands
const AuthenticateVoter = require('./commands/AuthenticateVoter');
const CastVote = require('./commands/CastVote');
const ClosePolls = require('./commands/ClosePolls');
const CreateElectionAdmin = require('./commands/CreateElectionAdmin');
const CreateOrganization = require('./commands/CreateOrganization');
const CreateReferendum = require('./commands/CreateReferendum');
const DeleteReferendum = require('./commands/DeleteReferendum');
const OpenPolls = require('./commands/OpenPolls');
const RegisterVoter = require('./commands/RegisterVoter');

//import domain
const ElectionAdmin = require('./domain/ElectionAdmin');
const Errors = require('./domain/Errors');
const Organization = require('./domain/Organization');
const PostalAddress = require('./domain/PostalAddress');
const Referendum = require('./domain/Referendum');
const Vote = require('./domain/Vote');
const Voter = require('./domain/Voter');

//import events
const ElectionAdminAppointed = require('./events/ElectionAdminAppointed');
const ElectionAdminCreated = require('./events/ElectionAdminCreated');
const OrganizationCreated = require('./events/OrganizationCreated');
const PollsClosed = require('./events/PollsClosed');
const PollsOpened = require('./events/PollsOpened');
const ReferendumCreated = require('./events/ReferendumCreated');
const ReferendumDeleted = require('./events/ReferendumDeleted');
const VoteCast = require('./events/VoteCast');
const VoterAuthenticated = require('./events/VoterAuthenticated');
const VoterHasVoted = require('./events/VoterHasVoted');
const VoterRegistered = require('./events/VoterRegistered');

const Utils = require('./utils');

exports = module.exports;
exports.commands = {};
exports.commands.AuthenticateVoter = AuthenticateVoter;
exports.commands.CastVote = CastVote;
exports.commands.ClosePolls = ClosePolls;
exports.commands.CreateElectionAdmin = CreateElectionAdmin;
exports.commands.CreateOrganization = CreateOrganization;
exports.commands.CreateReferendum = CreateReferendum;
exports.commands.DeleteReferendum = DeleteReferendum;
exports.commands.OpenPolls = OpenPolls;
exports.commands.RegisterVoter = RegisterVoter;

exports.domain = {};
exports.domain.ElectionAdmin = ElectionAdmin;
exports.domain.Errors = Errors;
exports.domain.Organization = Organization;
exports.domain.PostalAddress = PostalAddress;
exports.domain.Referendum = Referendum;
exports.domain.Vote = Vote;
exports.domain.Voter = Voter;

exports.events = {};
exports.events.ElectionAdminAppointed = ElectionAdminAppointed;
exports.events.ElectionAdminCreated = ElectionAdminCreated;
exports.events.OrganizationCreated = OrganizationCreated;
exports.events.PollsClosed = PollsClosed;
exports.events.PollsOpened = PollsOpened;
exports.events.ReferendumCreated = ReferendumCreated;
exports.events.ReferendumDeleted = ReferendumDeleted;
exports.events.VoteCast = VoteCast;
exports.events.VoterAuthenticated = VoterAuthenticated;
exports.events.VoterHasVoted = VoterHasVoted;
exports.events.VoterRegistered = VoterRegistered;

exports.Utils = new Utils();