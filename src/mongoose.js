
const config = require('dotenv').config();
const mongoose = require('mongoose');

let count = 0;

const options = {
    autoIndex: false,
    //useNewUrlParser: true,
    //useUnifiedTopology: true
}

const connectWithRetry = () => {
    console.log('Mongo connection with retry');
    mongoose.set('strictQuery', true);
    mongoose.connect(config.parsed.MONGO_CFG, options)
        .then(() => {
            console.log('Mongo is connected');

        }).catch(error => {
            console.log('Mongo connection unsuccessful, retry after 5 seconds. ', ++count);
            console.log('Mongo connection error: ', error);
            setTimeout(connectWithRetry, 5000);
        })
}

setTimeout(connectWithRetry, 2000);
exports.mongoose = mongoose;
