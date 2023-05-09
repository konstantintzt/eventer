const express = require("express")
const dotenv = require("dotenv")
const { MongoClient } = require("mongodb")
const { joi } = require("joi")

dotenv.config()

const app = express()

app.use(express.json())

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
    }
    app.listen(process.env.PORT, () => {
        console.log("API is running on port " + process.env.PORT)
        app.get("/", (req, res) => {
            res.send("Hello World!")
        })
        app.post("/new", async (req, res) => {
            try{
                let newEvent = req.body
                const db = mongoClient.db("eventer-dev")
                const events = db.collection("events")
                const doc = {
                    organizer: newEvent["organizer"],
                    address: newEvent["address"],
                    zip: newEvent["zip"],
                    type: newEvent["type"],
                    date: newEvent["date"],
                    desc: newEvent["desc"]
                }
                console.log(doc)
                console.log(newEvent)
                await events.insertOne(doc)
            }
            finally {
                res.sendStatus(200)
            }
        })
    })

}

main().catch(console.error)