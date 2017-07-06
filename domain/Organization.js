const CreateOrganization = require('../commands/CreateOrganization')
const OrganizationCreated = require('../events/OrganizationCreated')
const ElectionAdminAppointed = require('../events/ElectionAdminAppointed')

const errors = require('../domain/Errors')

class Organization {
  constructor () {
    this.id = null
    this.name = null
    this.version = -1
  }

  hydrate (evt) {
    if (evt instanceof OrganizationCreated) {
      this._onOrganizationCreated(evt)
      this.version++
    }
  }

  _onOrganizationCreated (evt) {
    this.id = evt.organizationId
    this.name = evt.name
  }

  execute (command) {
    if (command instanceof CreateOrganization) {
      return this._CreateOrganization(command)
    }
    throw new Error('Unknown command.')
  }

  _CreateOrganization (command) {
    var validationErrors = []
    if (this.id) {
      validationErrors.push({'field': '', 'msg': 'Organization already exists.'})
    }
    if (!command.organizationId) {
      validationErrors.push({'field': 'organizationId', 'msg': 'Organization does not exist.'})
    }
    if (!command.electionAdminId) {
      validationErrors.push({'field': 'electionAdminId', 'msg': 'Organization admin id is a required field.'})
    }
    if (!command.name) {
      validationErrors.push({'field': 'name', 'msg': 'Organization name is a required field.'})
    }
    if (validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors)
    }

    return Array.of(
      new OrganizationCreated(command.organizationId, command.name),
      new ElectionAdminAppointed(command.organizationId, command.electionAdminId)
    )
  }
}

module.exports = Organization
