const express = require('express')
const { registerUser, loginUser, userCredits, paymentRazorpay, verifyrazorpay } = require('../controllers/userController')
const userAuth = require('../middlewares/auth')
const { generateImage, modifyImage } = require('../controllers/imageController')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/generate-image', userAuth, generateImage)
userRouter.post('/modify-image', userAuth, upload.single('image'), modifyImage)
userRouter.post('/pay', userAuth, paymentRazorpay)
userRouter.post('/verify', userAuth, verifyrazorpay)

module.exports = userRouter