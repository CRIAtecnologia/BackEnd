const mongoose = require('mongoose');
const url = process.env.MONGO_URL;


class db {
    async connect() {
        mongoose.connect(url)
            .then(connected => {
                if (connected) {
                    console.log('Connected to the database!');
                    return true
                }
            })
            .catch(err => {
                if (err) {
                    console.log('Database not connected due an error', err)
                }
            });
    }
    async disconnect() {
        mongoose.disconnect(url)
            .then(disconnected => {
                if (disconnected) {
                    console.log('Disconnected to the database!');
                    return true
                }
            })
            .catch(err => {
                if (err) {
                    console.log('Database not disconnected due an error', err)
                }
            });
    }
}

module.exports = db;