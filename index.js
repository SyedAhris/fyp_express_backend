const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routes



// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connection Successfull!'))
    .catch((err) => {
        console.log(err);
    });

// check api
app.get('/', (req, res) => {
    console.log('test is successfull');
    res.send('Connected!');
});

app.listen(process.env.PORT || process.env.PORT_NO, () => {
    console.log('Backend running at: ', process.env.PORT_NO);
});