const router = require('express').Router()
const users = require('./users.js')
const quotes = require('./quotes')

router.use('/users', users)
router.use('/quotes', quotes)


module.exports = router