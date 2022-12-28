const bcrypt = require("bcrypt")
const userService = require("../user/user.service")
const logger = require("../../services/logger.service")

async function login(username, password) {
  logger.debug(`auth.service - login with username: ${username}`)
  const user = await userService.getByUsername(username, password)
  if (!user) return Promise.reject("Invalid username or password")
  delete user.password
  return user
}

async function signup({ username, password, bookmarks }) {
  const saltRounds = 10

  logger.debug(`auth.service - signup with username: ${username}`)
  if (!username || !password)
    return Promise.reject("username and password are required!")

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({ username, password: hash, bookmarks })
}

module.exports = {
  signup,
  login,
}
