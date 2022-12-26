const userService = require("./user.service")
const logger = require("../../services/logger.service")

async function getUser(req, res) {
  try {
    const user = await userService.getById(req.params.id)
    res.send(user)
  } catch (err) {
    logger.error("Failed to get user", err)
    res.status(500).send({ err: "Failed to get user" })
  }
}

async function getUsers(req, res) {
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
    await userService.remove(req.params.id)
    res.send({ msg: "Deleted successfully" })
  } catch (err) {
    logger.error("Failed to delete user", err)
    res.status(500).send({ err: "Failed to delete user" })
  }
}

async function updateUser(req, res) {
  try {
    const user = req.body
    const savedUser = await userService.update(user)
    res.send(savedUser)
  } catch (err) {
    logger.error("Failed to update user", err)
    res.status(500).send({ err: "Failed to update user" })
  }
}

async function addUser(req, res) {
  const user = req.body
  try {
    const addeduser = await userService.add(user)
    res.send(addeduser)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getUser,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
}
