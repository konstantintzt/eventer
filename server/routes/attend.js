const express = require("express")
const database = require("../database")
const { addEventAttendeeBodySchema } = require("../requestSchemas")

const router = express.Router()

router.post("/", async (req, res) => {
    const { error, value } = addEventAttendeeBodySchema.validate(req.body)
    // console.log(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        const event = await database.getDB().collection("events").findOne({ uuid: value.uuid })
        if (event == null) return res.status(400).json({ error: "Event does not exist" })
        else {
            await database.getDB().collection("attendances").insertOne({...value, confirmed: Math.floor(Date.now()/1000)})
            return res.status(200).json({ success: true })
        }
    }
})

module.exports = router