const  mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/inotebook"

const connected = () => {
    console.log("Mongo has been connected");
}

const connectToMongo = () => {
    mongoose.connect(mongoURI, connected())
}

module.exports = connectToMongo;