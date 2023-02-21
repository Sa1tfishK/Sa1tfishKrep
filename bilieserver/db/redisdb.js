let redis = require('redis')
let redisClient = redis.createClient('6379','127.0.0.1')

redisClient.on('error',(err) => console.log('Redis redisClient Error',err))
redisClient.connect()
module.exports = redisClient
