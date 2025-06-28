const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/AIimageGenerator`)
        console.log(`connect to database, host ${mongoose.connection.host}`)
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB