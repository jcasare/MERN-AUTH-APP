const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const connectDB = async () => {
  const mongo = await MongoMemoryServer.create()
  const getUri = mongo.getUri()

  mongoose.set('strictQuery', true)
  const db = await mongoose.connect(getUri)
  console.log('DB connected...')
  return getUri
  // return db
}

module.exports = connectDB
