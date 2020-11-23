const debug = require('./configs/debug')
const promisifyAsync = require('./utils/promisify-async')

const checkIfLocalJSAPITicketFound = require('./libs/check-if-local-jsapi-ticket-found')
const fetchLocalJSAPITicket = require('./libs/fetch-local-jsapi-ticket')
const fetchNewJSAPITicket = require('./libs/fetch-new-jsapi-ticket')

module.exports = promisifyAsync(async (request, response, next) => {
  const {
    sessionId
  } = request.params
  
  const ifLocalJSAPITicketFound = await checkIfLocalJSAPITicketFound(sessionId)

  if (ifLocalJSAPITicketFound !== false) {
    const jsapiTicket = await fetchLocalJSAPITicket(sessionId)
    debug.log(`
      using cached jsapi ticket
      ${jsapiTicket}
    `)
    response.json({
      jsapiTicket
    })
  } else {
    await fetchNewJSAPITicket(request, response)
  }
  

})