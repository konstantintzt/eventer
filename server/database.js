const { MongoClient } = require("mongodb")

var database = undefined

async function connect(mongoURI) {
    const mongoClient = new MongoClient(mongoURI)
    try {
        await mongoClient.connect()
        database = mongoClient.db(process.env.DB_NAME)
        console.log("Database connection successful")
        return database
    } catch (e) {
        console.log("[FATAL] Database connection error")
        console.error(e)
        process.exit(-1)
    }
}

function getDB() {
    return database
}


module.exports = { connect, getDB }