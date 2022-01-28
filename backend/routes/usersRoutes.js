const express = require('express')
const router = express.Router()
const userHelper = require('../helpers/userHelper')
const sendEmail = require('../utils/generateEmail')
const crypto = require('crypto')

router.post('/register',userHelper.userRegister)
router.post('/login',userHelper.userlogin)
router.get('/:id/verify/:token',userHelper.verifyEmail)

module.exports = router