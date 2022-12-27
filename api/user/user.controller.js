const userService = require("./user.service")
const logger = require("../../services/logger.service")

async function getUser(req, res) {
  try {
    const { _id } = req.cookies?.user
    const user = await userService.getById(_id)
    res.send(user)
  } catch (err) {
    logger.error("Failed to get user", err)
    res.status(500).send({ err: "Failed to get user" })
  }
}

async function deleteUser(req, res) {
  try {
    bookmarkId = req.params.id
    const { _id } = req.cookies?.user
    const user = await userService.remove(_id, bookmarkId)
    res.send(user)
  } catch (err) {
    logger.error("Failed to delete user", err)
    res.status(500).send({ err: "Failed to delete user" })
  }
}


module.exports = {
  getUser,
  deleteUser,
}
