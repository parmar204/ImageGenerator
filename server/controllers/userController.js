const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const razorpay = require("razorpay")
const Transaction = require('../models/transactionModel')

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            return res.json({success: false, message: 'Please fill all fields'})
        }

        if (password.length<6) {
            return res.json({success: false, message: 'Password must be at least 6 characters'})
        }

        if (await User.findOne({email})) {
            return res.json({success: false, message: 'User already exists'})
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
            return res.json({success: false, message: 'Please fill all fields'})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.json({success: false, message: 'user does not exist'})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.json({success: false, message: 'Password does not match'})
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
        const userId = req.userId
        const user = await User.findById(userId)
        res.json({
            success: true, credits: user.creditBalance, user: {name: user.name}
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_API_SECRET
})

const paymentRazorpay = async (req, res) => {
    try {
        const {planId} = req.body
        const userId = req.userId
        const user = await User.findById(userId)
        if (!user || !planId) {
            return res.json({success:false, message: 'Missing details'})
        }

        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan='Basic'
                credits=100
                amount=50
                break;
            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=250
                break;
            case 'Business':
                plan='Business'
                credits=5000
                amount=1250
                break;
            default:
                return res.json({success: false, message: 'Invalid Plan'});
        }

        date = Date.now()

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await Transaction.create(transactionData)

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({success: false, message: 'Error creating order'})
            }

            res.json({
                success: true, order
            })
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const verifyrazorpay = async (req, res) => {
    try {
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const transactionData = await Transaction.findById(orderInfo.receipt)

            if (transactionData.payment) {
                return res.json({success: false, message: 'Payment Failed'})
            }

            const userData = await User.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await User.findByIdAndUpdate(userData._id, {creditBalance})
            await Transaction.findByIdAndUpdate(transactionData._id, {payment: true})

            res.json({success: true, message: "Credits Added"})
        } else {
            res.json({success: false, message: 'Payment Failed'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    registerUser, loginUser, userCredits, paymentRazorpay, verifyrazorpay
} 