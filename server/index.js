const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path')

const app = express();
const PORT = process.env.PORT || 8000;

require('./config/db')()

app.use(cors({
    origin: process.env.FRONTEN_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("server started")
})
app.use('/api/user', require('./routes/userRoutes'))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});