const express = require('express')
const router = express.Router()
const todo = require('./todo')

const word = require('./word') // 추가
router.use('/words', word) //  추가 /api/word

router.use('/todos', todo)

module.exports = router
