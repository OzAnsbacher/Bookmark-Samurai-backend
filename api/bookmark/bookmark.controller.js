const bookmarkService = require("./bookmark.service.js")
const userService = require("../user/user.service")
const logger = require("../../services/logger.service")
// const { broadcast } = require("../../services/socket.service.js")

async function getbookmarks(req, res) {
  try {
    const queryParams = req.query
    const bookmarks = await bookmarkService.query(queryParams)
    res.json(bookmarks)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function removebookmark(req, res) {
  try {
    const bookmarkId = req.params.id
    console.log(bookmarkId);
    const removedId = await bookmarkService.remove(bookmarkId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}


module.exports = {
  getbookmarks,
  removebookmark,
}
