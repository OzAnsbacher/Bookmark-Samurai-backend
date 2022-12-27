const express = require('express')
const { getbookmarks, removebookmark} = require('./bookmark.controller')
const router = express.Router()


router.get('/', getbookmarks)
router.delete('/:id', removebookmark)

module.exports = router
