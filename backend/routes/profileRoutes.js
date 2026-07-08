const express = require('express')
const { authMiddleware } = require('../middleware/authMIiddleware')
const {getUser, updateUser, changePassword, forgetPassword,resetPassword, registerUser, loginUser} =require('../controller/userController')
const upload=require('../config/multer')

const router =express.Router()
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/',authMiddleware,getUser)
router.put('/',authMiddleware,upload.single('profile_image'),updateUser)
router.put('/change-password',authMiddleware,changePassword)
router.put('/forget-password',forgetPassword)
router.put('/reset-password',resetPassword)
module.exports=router