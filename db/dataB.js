const mongoose = require("mongoose");
require("dotenv").config()

const MONGODB_URL = process.env.MONGODB_URL

function connectToMongoDB(){
    mongoose.connect(MONGODB_URL)

    mongoose.connection.on("connected", () => {
        console.log("Connected to Mongodb successfully")
    } )

    mongoose.connection.on("error", (err) => {
        console.log("err")
        console.log("an error occurred!")
    } )
}

module.exports = { connectToMongoDB };