const debug = require('../configs/debug')
const redisClient = require('../configs/redis')
const { promisify } = require('util')

module.exports = async sessionId => {
  const key = 
    `user:` +
    `${sessionId}:` +
    `jsapi_ticket`
  const redisGet = promisify(redisClient.get).bind(redisClient)
  return await redisGet(key)
}