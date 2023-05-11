const express = require("express")
const dotenv = require("dotenv")
const { fetchEventsSchema } = require("./querySchemas")
const { MongoClient } = require("mongodb")

dotenv.config()

const mongoURI = process.env.MONGO_URI

const app = express()

async function main() {
    const mongoClient = new MongoClient(mongoURI)
    var database = undefined
    try {
        await mongoClient.connect()
        database = mongoClient.db(process.env.DB_NAME)
        console.log("Database connection successful")

    } catch (e) {
        console.log("[FATAL] Database connection error")
        console.error(e)
        process.exit(-1)
    }
    app.get("/events", async (req, res) => {
        const { error, value } = fetchEventsSchema.validate(req.query)
        if (error) return res.status(400).json( {error: error.details[0].message})
        else {
            if (value.before != undefined) value.date = { $lte: value.before }
            if (value.after != undefined) value.date = {...value.date, $gte: value.after }
            value.before = undefined
            value.after = undefined
            const results = await database.collection("events").find(value).toArray()
            return res.status(200).json(results)
        }
    })

    app.get("/", (req, res) => {
        res.status(404).send("Not found");
    })

    app.listen(process.env.PORT, () => {
        console.log("API is running on port " + process.env.PORT)
    })
}

main().catch(console.error)