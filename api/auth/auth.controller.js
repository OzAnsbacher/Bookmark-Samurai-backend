const authService = require("./auth.service")
const logger = require("../../services/logger.service")

async function login(req, res) {
  const { username, password } = req.body
  try {
    const user = await authService.login(username, password)
    res.cookie("user", user)
    res.send(user)
  } catch (err) {
    logger.error("Failed to Login " + err)
    res.status(401).send({ err: "Failed to Login" })
  }
}

async function signup(req, res) {
  try {
    const { username, password, bookmarks } = req.body
    const account = await authService.signup(req.body)
    logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
    const user = await authService.login(account.username, account.password)
    res.cookie("user", user)
    res.send(user)
  } catch (err) {
    logger.error("Failed to signup " + err)
    res.status(500).send({ err: "Failed to signup" })
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("user")
    res.send({ msg: "Logged out successfully" })
  } catch (err) {
    res.status(500).send({ err: "Failed to logout" })
  }
}

module.exports = {
  login,
  signup,
  logout,
}
