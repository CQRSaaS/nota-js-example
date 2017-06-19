const RegisterVoter = require('../commands/RegisterVoter');
const VoterRegistered = require('../events/VoterRegistered');
const errors = require('../domain/Errors');

class Voter {
  constructor() {
    this.id = null;
    this.firstname = null;
    this.lastname = null;
    this.address = null;
    this.organizationId = null;
    this.version = -1;
  }

  hydrate(evt) {
      if (evt instanceof VoterRegistered) {
        this._onVoterRegistered(evt);
        this.version++;
      }
  }

  _onVoterRegistered(evt) {
    this.id = evt.voterId;
    this.firstname = evt.firstname;
    this.lastname = evt.lastname;
    this.address = evt.address;
    this.organizationId = evt.organizationId;
  }

  execute(command) {
    if (command instanceof RegisterVoter) {
      return this._RegisterVoter(command);
    }
    throw new Error('Unknown command.');
  }

  _RegisterVoter(command) {
    var validationErrors = [];
    if(this.id) {
      validationErrors.push({"field": "", "msg": "Voter already exists."})
    }
    if(!command.voterId) {
      validationErrors.push({"field": "voterId", "msg": "Voter id is a required field."});
    }
    if(!command.organizationId) {
      validationErrors.push({"field": "organizationId", "msg": "Organization does not exist."});
    }
    if(!command.firstname) {
      validationErrors.push({"field": "firstname", "msg": "Voter firstname is a required field."});
    }
    if(!command.lastname) {
      validationErrors.push({"field": "lastname", "msg": "Voter lastname is a required field."});
    }
    if(command.address && !command.address.postalCode) {
      validationErrors.push({"field": "postalCode", "msg": "Zip / Postal Code is a required field."});
    }
    if(command.address && !command.address.addressRegion) {
      validationErrors.push({"field": "addressRegion", "msg": "Address Region is a required field."});
    }
    if(validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors);
    }
    var result = [];
    result.push(new VoterRegistered(command.voterId, command.organizationId, command.firstname, command.lastname, command.address));
    return result;
  }
};

module.exports = Voter;