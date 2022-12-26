const bookmarkService = require("./bookmark.service.js")
const userService = require("../user/user.service")
const logger = require("../../services/logger.service")
const { broadcast } = require("../../services/socket.service.js")

async function getbookmarks(req, res) {
  try {
    const queryParams = req.query
    const bookmarks = await bookmarkService.query(queryParams)
    res.json(bookmarks)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function getbookmarkById(req, res) {
  try {
    const bookmarkId = req.params.id
    const bookmark = await userService.getById(bookmarkId)
    res.json(bookmark)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addbookmark(req, res) {
  const bookmark = req.body
  try {
    const addedbookmark = await bookmarkService.add(bookmark)
    // broadcast({ type: "something-changed", userId: req.session?.user._id })
    res.json(addedbookmark)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updatebookmark(req, res) {
  try {
    const bookmark = req.body
    const updatedbookmark = await bookmarkService.update(bookmark)
    res.json(updatedbookmark)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removebookmark(req, res) {
  try {
    const bookmarkId = req.params.id
    const removedId = await bookmarkService.remove(bookmarkId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addReview(req, res) {
  const bookmarkId = req.params.id
  const review = req.body
  try {
    const addedReview = await bookmarkService.addReview(review, bookmarkId)
    res.send(addedReview)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getbookmarks,
  getbookmarkById,
  addbookmark,
  updatebookmark,
  removebookmark,
  addReview,
}
