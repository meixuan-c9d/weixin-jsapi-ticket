require('./configs/environment')()
const debug = require('./configs/debug')
const express = require('express')
const app = express()

const getJSAPITicket = require('./get-jsapi-ticket')
app
  .route('/:sessionId/:baseAccessToken')
  .get(getJSAPITicket)
app.listen(process.env.LISTEN_PORT, () => {
  debug.log(`jsapi_ticket service running at ${process.env.LISTEN_PORT}`)
})