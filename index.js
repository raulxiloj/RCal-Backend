const express = require('express');
require('dotenv').config();

const app = express();

// Public
app.use(express.static('public'));

//Routes
//app.get('/', (req, res) => {
//
//    res.json({
//        ok: true
//    })
//
//})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})