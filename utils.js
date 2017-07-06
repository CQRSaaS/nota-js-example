const {
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
} = require('./events')

const {
  ElectionAdmin,
  Organization,
  PostalAddress,
  Referendum,
  Vote,
  Voter
} = require('./domain')

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
    const EventClass = this.eventsMap[ev.eventType]
    if (!EventClass) {
      throw new Error(`No event class registered for eventType "${ev.eventType}".`)
    }
    Object.setPrototypeOf(eventObject, EventClass.prototype)
    return eventObject
  }

  convertToTypedAggregate (aggregate, aggregateType) {
    const AggregateClass = this.aggregateMap[aggregateType]
    if (!AggregateClass) {
      throw new Error(`No aggregate class registered for aggregateType "${aggregateType}".`)
    }
    if (!aggregate) {
      aggregate = new AggregateClass()
    }
    const aggregateJSON = JSON.stringify(aggregate)
    const aggregateObject = JSON.parse(aggregateJSON)

    Object.setPrototypeOf(aggregateObject, AggregateClass.prototype)
    return aggregateObject
  }

  emptyUUID () { return '00000000-0000-0000-0000-000000000000' }
}

module.exports = Utils
