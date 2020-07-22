const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB connected');

    } catch (e) {
        console.log(e);
        throw new Error('Error starting db');
    }

}

module.exports = {
    dbConnection
}