const commands = require('./commands')
const domain = require('./domain')
const events = require('./events')

const Utils = require('./utils')
const utils = new Utils()

module.exports = {
  commands,
  domain,
  events,
  utils
}
