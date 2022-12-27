const dbService = require("../../services/db.service")
const utilService = require("../../services/utilService.js")
const ObjectId = require("mongodb").ObjectId

async function query(filterBy) {
  const collection = await dbService.getCollection("bookmark")
  var bookmarks = await collection.find("").sort({}).toArray()
  return bookmarks
}

async function remove(bookmarkId) {
  const collection = await dbService.getCollection("bookmark")
  await collection.deleteOne({ _id: ObjectId(bookmarkId) })
  return bookmarkId
}

module.exports = {
  remove,
  query,
}
