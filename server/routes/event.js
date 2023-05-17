const express = require("express")
const database = require("../database")
const { v4: uuidv4 } = require('uuid')
const { fetchSingleEventParamsSchema, addNewEventBodySchema } = require("../requestSchemas")

const router = express.Router()


router.get("/:uuid", async (req, res) => {
    const { error, value } = fetchSingleEventParamsSchema.validate(req.params)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        const results = await database.getDB().collection("events").findOne(value)
        return res.status(200).json(results)
    }
})

router.post("/new", async (req, res) => {
    const { error, value } = addNewEventBodySchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        console.log(req.body)
        await database.getDB().collection("events").insertOne({...value, uuid: uuidv4()})
        return res.status(200).json({ success: true })
    }
})

module.exports = router