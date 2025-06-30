const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({success: false, message: 'No token Provided'})
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            req.userId = tokenDecode.id 
        } else {
            return res.status(401).json({success: false, message: 'Invalid token'})
        }
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = userAuth