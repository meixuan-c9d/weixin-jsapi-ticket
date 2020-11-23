const debug = require('../configs/debug')
const querystring = require('querystring')
const fetch = require('node-fetch')
const cacheJSAPITicket = require('../cache-jsapi-ticket')

module.exports = async (request, response) => {
  
  const responseFetch = await fetch(
    `${process.env.WEIXIN_API_JSAPI_TICKET}?` + 
    querystring.stringify({
      type: 'jsapi',
      access_token: request.params.baseAccessToken
    })
  )
  const responseConcat = await responseFetch.json()
  debug.log(responseConcat)
  
  if (responseConcat.errcode == 0) {
    if (
      responseConcat.ticket === undefined ||
      responseConcat.expires_in === undefined
    ) {
      throw new Error(`
        expected key not found
        received ${responseConcat}
      `)
    }
    const sessionId = request.params.sessionId
    const {
      ticket: jsapiTicket,
      expires_in: jsapiTicketTTL
    } = responseConcat
    cacheJSAPITicket({
      sessionId,
      jsapiTicket,
      jsapiTicketTTL
    })
    return response.json({
      jsapiTicket
    })
  }

  const {
    errcode,
    errmsg
  } = responseConcat

  throw new Error(`
    errro fetching jsapi ticket
    errcode ${errcode}
    errmsg ${errmsg}
  `)
}