const CreateReferendum = require('../commands/CreateReferendum');
const DeleteReferendum = require('../commands/DeleteReferendum');
const AuthenticateVoter = require("../commands/AuthenticateVoter");
const OpenPolls = require("../commands/OpenPolls");
const ClosePolls = require("../commands/ClosePolls");
const CastVote = require("../commands/CastVote");
const ReferendumCreated = require('../events/ReferendumCreated');
const ReferendumDeleted = require('../events/ReferendumDeleted');
const PollsOpened = require('../events/PollsOpened');
const PollsClosed = require('../events/PollsClosed');
const VoterAuthenticated = require("../events/VoterAuthenticated");
const VoterHasVoted = require("../events/VoterHasVoted");
const VoteCast = require("../events/VoteCast");
const errors = require('../domain/Errors');

class Referendum {
  constructor() {
    this.id = null;
    this.options = [];
    this.status = "created";
    this.authenticatedVoters = [];
    this.votersWhoHaveVoted = [];
    this.organizationId = null;
    this.name = null;
    this.proposal = null;
    this.version = -1;
  }

  hydrate(evt) {
    if (evt instanceof ReferendumCreated) {
      this._onReferendumCreated(evt);
      this.version++;
    }
    if (evt instanceof PollsOpened) {
      this._onPollsOpened();
      this.version++;
    }
    if (evt instanceof PollsClosed) {
      this._onPollsClosed();
      this.version++;
    }
    if (evt instanceof VoterAuthenticated) {
      this._onVoterAuthenticated(evt);
      this.version++;
    }
    if (evt instanceof VoterHasVoted) {
      this._onVoterHasVoted(evt);
      this.version++;
    }
    if (evt instanceof ReferendumDeleted) {
      this._onReferendumDeleted(evt);
      this.version++;
    }
  }

  _onReferendumCreated(evt) {
    this.id = evt.referendumId;
    this.options = evt.options;
    this.name = evt.name;
    this.proposal = evt.proposal;
    this.organizationId = evt.organizationId;
  }

  _onPollsOpened() {
    this.status = "polls_open";
  }

  _onPollsClosed() {
    this.status = "polls_closed";
  }

  _onVoterAuthenticated(evt) {
    this.authenticatedVoters.push(evt.voterId);
  }

  _onVoterHasVoted(evt){
    this.votersWhoHaveVoted.push(evt.voterId);
  }

  _onReferendumDeleted(evt) {
    this.status = "deleted";
  }

  execute(command) {
    if (command instanceof CreateReferendum) {
      return this._CreateReferendum(command);
    }
    if (command instanceof DeleteReferendum) {
      return this._DeleteReferendum(command);
    }
    if (command instanceof OpenPolls) {
      return this._OpenPolls(command);
    }
    if (command instanceof ClosePolls) {
      return this._ClosePolls(command);
    }
    if (command instanceof AuthenticateVoter) {
      return this._AuthenticateVoter(command);
    }
    if(command instanceof CastVote){
      return this._CastVote(command)
    }
    throw new Error('Unknown command.');
  }

  _CreateReferendum(command) {
    var validationErrors = [];
    if(this.id) {
      validationErrors.push({"field": "", "msg": "Referendum already exists."})
    }
    if(!command.referendumId) {
      validationErrors.push({"field": "referendumId", "msg": "Referendum id is a required field."});
    }
    if(!command.organizationId) {
      validationErrors.push({"field": "organizationId", "msg": "Organization does not exist."});
    }
    if(!command.proposal) {
      validationErrors.push({"field": "proposal", "msg": "Referendum proposal is a required field."});
    }   
    if(!command.name) {
      validationErrors.push({"field": "name", "msg": "Referendum name is a required field."});
    }   
    if(!command.options) {
      validationErrors.push({"field": "options", "msg": "Referendum options are required."});
    }
    if(command.options&&command.options.length < 2) {
      validationErrors.push({"field": "options", "msg": "At least two options are required."});
    }   
    if(validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors);
    }  
    command.options.push("None of the above");
    var result = [];
    result.push(new ReferendumCreated(command.referendumId, command.organizationId, command.name, command.proposal, command.options));
    return result;
  }

  _DeleteReferendum(command) {
    var validationErrors = [];
    if(!this.id) {
      validationErrors.push({"field": "", "msg": "Referendum doesn't exist."})
    }
    if(!command.referendumId) {
      validationErrors.push({"field": "referendumId", "msg": "Referendum id is a required field."});
    }
    if(this.status === "polls_open") {
      validationErrors.push({ "field": "", "msg": "Can't delete. Polls are open."})
    }
    if(this.status === "polls_closed") {
      validationErrors.push({ "field": "", "msg": "Polls are closed. Can't delete a completed referendum."})
    }
    if(validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors);
    }  
    var result = [];
    result.push(new ReferendumDeleted(command.referendumId));
    return result;
  }

  _OpenPolls(command) {
    var validationErrors = [];
    if(!this.id) {
      validationErrors.push({"field": "", "msg": "Referendum does not exist."})
    }    
    if(!command.referendumId) {
      validationErrors.push({"field": "referendumId", "msg": "Referendum id is a required field."});
    }
    if(this.status === "polls_open") {
      validationErrors.push({"field": "", "msg": "Polls are already open."})      
    }
    if(this.status === "polls_closed") {
      validationErrors.push({"field": "", "msg": "Polls have already been closed."})      
    }
    if(validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors);
    }  
    var result = [];
    result.push(new PollsOpened(command.referendumId));
    return result;
  }

  _ClosePolls(command) {
    var validationErrors = [];
    if(!this.id) {
      validationErrors.push({"field": "", "msg": "Referendum does not exist."})
    }    
    if(!command.referendumId) {
      validationErrors.push({"field": "referendumId", "msg": "Referendum id is a required field."});
    }
    if(!(this.status === "polls_open")) {
      validationErrors.push({"field": "referendumId", "msg": "Polls are not open."})      
    }
    if(validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors);
    }  
    var result = [];
    result.push(new PollsClosed(command.referendumId));
    return result;
  }

  _AuthenticateVoter(command) {
    var validationErrors = [];
    if(!command.referendumId) {
      validationErrors.push({"field": "referendumId", "msg": "Referendum id is a required field."});
    }
    if(!command.organizationId) {
      validationErrors.push({"field": "organizationId", "msg": "Organization does not exist."});
    }
    if(this.status != "polls_open") {
      validationErrors.push({"field": "", "msg": "Polls are not open."})      
    }    
    if(!command.voterId) {
      validationErrors.push({"field": "voterId", "msg": "Voter id is a required field."});
    }
    var voter = command.voterList.find(function (v) { return v.voterId === command.voterId; });
    if(voter === undefined ) {
      validationErrors.push({"field": "voterId", "msg": "Voter is not on voter list"});
    }
    if(this.authenticatedVoters.indexOf(command.voterId) != -1) {
      validationErrors.push({"field": "voterId", "msg": "Voter has already voted"});      
    }
    if(validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors);
    }  
    var result = [];
    result.push(new VoterAuthenticated(command.referendumId, command.organizationId, command.voterId));
    return result;
  }

  _CastVote(command){
    var validationErrors = [];
    if(!command.referendumId) {
      validationErrors.push({"field": "referendumId", "msg": "Referendum id is a required field."});
    }
    if(this.status != "polls_open") {
      validationErrors.push({"field": "", "msg": "Polls are not open."})      
    }    
    if(!command.vote) {
      validationErrors.push({"field": "vote", "msg": "Vote is a required field."});
    }
    if(!this.options.find((option)=>option === command.vote)){
      validationErrors.push({"field": "vote", "msg": "Option does not exist."});
    }
    if(this.authenticatedVoters.indexOf(command.voterId) === -1) {
      validationErrors.push({"field": "voterId", "msg": "Voter is not authenticated."});
    }
    if(this.votersWhoHaveVoted.indexOf(command.voterId) > -1) {
      validationErrors.push({"field": "voterId", "msg": "Voter has already voted."});
    }
    if(validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors);
    }
    var result = [];
    // This is a problem for ensuring votes are secret: VoterHasVoted followed so closely in time by VoteCast allows the two events to be correlated.
    result.push(new VoterHasVoted(command.referendumId, command.voterId));
    result.push(new VoteCast(command.referendumId, command.vote));
    return result;
  }
}

module.exports = Referendum;