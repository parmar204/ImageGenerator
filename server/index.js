const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

require('./config/db')()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Express server is running!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});