// Events
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
// Domain
const ElectionAdmin = require('./domain/ElectionAdmin.js')
const Organization = require('./domain/Organization.js')
const PostalAddress = require('./domain/PostalAddress.js')
const Referendum = require('./domain/Referendum.js')
const Voter = require('./domain/Voter.js')
const Vote = require('./domain/Vote.js')

class Utils {
  constructor () {
    // create eventsMap
    this.eventsMap = {}
    this.eventsMap['ElectionAdminAppointed'] = ElectionAdminAppointed
    this.eventsMap['ElectionAdminCreated'] = ElectionAdminCreated
    this.eventsMap['OrganizationCreated'] = OrganizationCreated
    this.eventsMap['PollsClosed'] = PollsClosed
    this.eventsMap['PollsOpened'] = PollsOpened
    this.eventsMap['ReferendumCreated'] = ReferendumCreated
    this.eventsMap['ReferendumDeleted'] = ReferendumDeleted
    this.eventsMap['VoteCast'] = VoteCast
    this.eventsMap['VoterAuthenticated'] = VoterAuthenticated
    this.eventsMap['VoterHasVoted'] = VoterHasVoted
    this.eventsMap['VoterRegistered'] = VoterRegistered
    // create aggregateMap
    this.aggregateMap = {}
    this.aggregateMap['ElectionAdmin'] = ElectionAdmin
    this.aggregateMap['PostalAddress'] = PostalAddress
    this.aggregateMap['Organization'] = Organization
    this.aggregateMap['Referendum'] = Referendum
    this.aggregateMap['Vote'] = Vote
    this.aggregateMap['Voter'] = Voter
  }

  convertToTypedEvent (ev) {
    if (!ev) {
      throw new Error(`event cannot be null.`)
    }
    const eventJSON = JSON.stringify(ev.event)
    const eventObject = JSON.parse(eventJSON)
    const eventClass = this.eventsMap[ev.eventType]
    if (!eventClass) {
      throw new Error(`No event class registered for eventType "${ev.eventType}".`)
    }
    eventObject.__proto__ = eventClass.prototype
    return eventObject
  }

  convertToTypedAggregate (aggregate, aggregateType) {
    const aggregateClass = this.aggregateMap[aggregateType]
    if (!aggregateClass) {
      throw new Error(`No aggregate class registered for aggregateType "${aggregateType}".`)
    }
    if (!aggregate) {
      aggregate = new aggregateClass()
    }
    const aggregateJSON = JSON.stringify(aggregate)
    const aggregateObject = JSON.parse(aggregateJSON)

    aggregateObject.__proto__ = aggregateClass.prototype
    return aggregateObject
  }

  emptyUUID () { return '00000000-0000-0000-0000-000000000000' }
}

module.exports = Utils
