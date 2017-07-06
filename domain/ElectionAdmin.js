const CreateElectionAdmin = require('../commands/CreateElectionAdmin')
const ElectionAdminCreated = require('../events/ElectionAdminCreated')
const errors = require('../domain/Errors')

class ElectionAdmin {
  constructor (address) {
    this.id = null
    this.address = address
    this.firstname = null
    this.lastname = null
    this.version = -1
  }

  hydrate (evt) {
    if (evt instanceof ElectionAdminCreated) {
      this._onElectionAdminCreated(evt)
      this.version++
    }
  }

  _onElectionAdminCreated (evt) {
    this.id = evt.electionAdminId
    this.firstname = evt.firstname
    this.lastname = evt.lastname
    this.address = evt.address
  }

  execute (command) {
    if (command instanceof CreateElectionAdmin) {
      return this._CreateElectionAdmin(command)
    }
    throw new Error('Unknown command.')
  }

  isValidPostalCode (postalCode, countryCode) {
    var postalCodeRegex
    switch (countryCode) {
      case 'US':
        postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test(postalCode)
        break
      case 'CA':
        postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/.test(postalCode)
        break
      default:
        return true
    }
    return postalCodeRegex
  }

  _CreateElectionAdmin (command) {
    var validationErrors = []
    if (this.id) {
      validationErrors.push({'field': '', 'msg': 'ElectionAdmin already exists.'})
    }
    if (!command.electionAdminId) {
      validationErrors.push({'field': 'electionAdminId', 'msg': 'ElectionAdmin id is a required field.'})
    }
    if (!command.firstname) {
      validationErrors.push({'field': 'firstname', 'msg': 'ElectionAdmin firstname is a required field.'})
    }
    if (!command.lastname) {
      validationErrors.push({'field': 'lastname', 'msg': 'ElectionAdmin lastname is a required field.'})
    }
    if (!this.isValidPostalCode(command.address.postalCode, command.address.addressCountry)) {
      validationErrors.push({'field': 'postalCode', 'msg': 'Zip / Postal Code is invalid overall.'})
    }

    if (command.address && !command.address.postalCode) {
      validationErrors.push({'field': 'postalCode', 'msg': 'Zip / Postal Code is a required field.'})
    }

    if (command.address && !command.address.addressRegion) {
      validationErrors.push({'field': 'addressRegion', 'msg': 'Address Region is a required field.'})
    }
    if (validationErrors.length > 0) {
      throw new errors.ValidationFailed(validationErrors)
    }
    var result = []
    result.push(new ElectionAdminCreated(command.electionAdminId, command.firstname, command.lastname, command.address))
    return result
  }
}

module.exports = ElectionAdmin
