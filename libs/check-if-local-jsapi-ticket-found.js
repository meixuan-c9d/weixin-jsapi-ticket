const debug = require('../configs/debug')
const redisClient = require('../configs/redis')
const { promisify } = require('util')

module.exports = async sessionId => {
  const key = 
  `user:` +
  `${sessionId}:` +
  `jsapi_ticket`

  const redisTtl = promisify(redisClient.ttl).bind(redisClient)
  const ttl = await redisTtl(key)  

  if (ttl === -2) {
    return false
  } else {
    return ttl
  }
}