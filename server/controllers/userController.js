const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: 'Please fill all fields'})
        }

        if (password.length<6) {
            return res.status(400).json({success: false, message: 'Password must be at least 6 characters'})
        }

        if (await User.findOne({email})) {
            return res.status(400).json({success: false, message: 'User already exists'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name, email, password: hashedPassword
        })

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.status(201).json({
            success: true, token, user: {name: user.name}
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({success: false, message: 'Please fill all fields'})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({success: false, message: 'user does not exist'})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({success: false, message: 'Password does not match'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

         res.status(201).json({
            success: true, token, user: {name: user.name}
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const userCredits = async (req, res) => {
    try {
        const {userId} = req.body
        const user = await User.findById(userId)
        res.json({
            success: true, credits: user.creditBalance, user: {name: user.name}
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    registerUser, loginUser, userCredits
} 