const bookmarkService = require("./bookmark.service.js")
const userService = require("../user/user.service")
const logger = require("../../services/logger.service")
// const { broadcast } = require("../../services/socket.service.js")

async function getBookmarks(req, res) {
  try {
    const queryParams = req.query
    const bookmarks = await bookmarkService.query(queryParams)
    res.json(bookmarks)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function removeBookmark(req, res) {
  try {
    const bookmarkId = req.params.id
    const removedId = await bookmarkService.remove(bookmarkId)
    console.log(removedId)
    res.send({id:removedId})
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getBookmarks,
  removeBookmark,
}
