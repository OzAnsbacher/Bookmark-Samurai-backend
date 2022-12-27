const dbService = require("../../services/db.service")
const ObjectId = require("mongodb").ObjectId

module.exports = {
  remove,
  getById,
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection("user")
    const user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password
    return user
  } catch (err) {
    logger.error(`while finding user ${userId}`, err)
    throw err
  }
}

async function remove(userId, bookmarkId) {
  try {
    const collection = await dbService.getCollection("user")
    let user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password
    user.bookmarks = user.bookmarks.filter((bookmark) => {
      if (bookmark._id !== bookmarkId) return bookmark
    })
    await collection.updateOne(
      { _id: ObjectId(user._id) },
      { $set: user }
    )
    return user
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}


