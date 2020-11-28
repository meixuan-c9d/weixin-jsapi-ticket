const debug = require('./configs/debug')
const redisClient = require('./configs/redis')
const { promisify } = require('util')

module.exports = async ({
  sessionId,
  jsapiTicket,
  jsapiTicketTTL
}) => {
  const redisSet = promisify(redisClient.set).bind(redisClient)
  redisSet(
    `user:${sessionId}:jsapi_ticket`, 
    jsapiTicket, 
    'EX',
    jsapiTicketTTL
  )
    .then(result => {
      debug.log(`
        set jsapi ticket
        result ${result}
      `)
    })
    .catch(error => {
      debug.error(`
        set jsapi ticket failed
        ${error}
      `)
      
    })
}