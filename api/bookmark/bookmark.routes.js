const express = require('express')
const { getBookmarks, removeBookmark} = require('./bookmark.controller')
const router = express.Router()


router.get('/', getBookmarks)
router.delete('/:id', removeBookmark)

module.exports = router
