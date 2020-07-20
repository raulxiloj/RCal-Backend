const express = require('express');

const app = express();

//Routes
app.get('/', (req, res) => {

    res.json({
        ok: true
    })

})

app.listen(4000, () => {
    console.log(`Server running on port ${4000}`);
})