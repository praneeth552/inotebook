const  mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

const connected = () => {
    console.log("Mongo has been connected");
}

const connectToMongo = () => {
    mongoose.connect(mongoURI, connected())
}

module.exports = connectToMongo;