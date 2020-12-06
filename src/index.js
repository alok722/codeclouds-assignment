const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/index');
const { resolve } = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(resolve(__dirname, '../public')));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api', routes);
app.use('*', (req, res) => {
    res.status(404).send('NOT ALLOWED');
});

mongoose.connect(
    process.env.MONGODB_CONNECTION_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) console.error(err);
        console.log('MONGODB connected successfully');
    }
);

app.listen(PORT, () =>
    console.log(`Express server currently running on port ${PORT}`)
);

module.exports = app; // for testing
