const express = require('express');
require('dotenv').config();

const app = express();

//Middlewares
app.use(express.static('public'));
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})