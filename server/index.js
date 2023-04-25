const express = require("express")
const dotenv = require("dotenv")
const { MongoClient } = require("mongodb")

dotenv.config()

const app = express()


async function main() {
    const mongoURI = process.env.MONGO_URI
    const mongoClient = new MongoClient(mongoURI)
    try {
        await mongoClient.connect()
        console.log("Database connection successful")
    } catch (e) {
        console.log("[FATAL] Database connection error")
        console.error(e)
        process.exit(-1)
    } finally {
        await mongoClient.close()
    }
    app.listen(process.env.PORT, () => {
        console.log("API is running on port " + process.env.PORT)
        app.get("/", (req, res) => {
            res.send("Hello World!")
        })
    })

}

main().catch(console.error)