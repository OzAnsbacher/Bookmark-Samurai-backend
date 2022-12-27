const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, deleteUser } = require('./user.controller')
const router = express.Router()

router.get('/', getUser)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)

module.exports = router
