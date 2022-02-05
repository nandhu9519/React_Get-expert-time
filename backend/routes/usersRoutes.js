const express = require('express')
const router = express.Router()
const userHelper = require('../helpers/userHelper')
const crypto = require('crypto')

router.post('/register',userHelper.userRegister)
router.post('/login',userHelper.userlogin)
router.get('/:id/verify/:token',userHelper.verifyEmail)
router.post('/googleLogin',userHelper.googleLogin)
router.post('/expertSignUp',userHelper.expertSignUp)
router.post('/expertLogin',userHelper.expertLogin)

module.exports = router