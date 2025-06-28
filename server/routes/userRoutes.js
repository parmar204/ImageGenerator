const express = require('express')
const { registerUser, loginUser, userCredits } = require('../controllers/userController')
const userAuth = require('../middlewares/auth')
const { generateImage } = require('../controllers/imageController')

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/generate-image', userAuth, generateImage)

module.exports = userRouter