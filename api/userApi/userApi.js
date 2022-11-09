
const { signUp, signIn, verifyEmail, profilePic, getUser } = require('../../services/userServices/userService')
const {Upload} = require('./../../commen/uploadImg')
const router = require('express').Router()
router.post('/signup' , signUp)
router.post('/signIn' , signIn)
router.get('/verify/:token' , verifyEmail)
router.patch('/profilePic' ,Upload('profile_Pic'), profilePic)
router.get('/getUser' , getUser)
module.exports = router