const express = require("express")
const database = require("../database")
const { v4: uuidv4 } = require('uuid')
const { fetchSingleEventParamsSchema, addNewEventBodySchema } = require("../requestSchemas")
const passport = require("passport")
const router = express.Router()


router.get("/:uuid", async (req, res) => {
    const { error, value } = fetchSingleEventParamsSchema.validate(req.params)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        // console.log("uuid")
        // console.log(value)
        const attendees = await database.getDB().collection("attendances").find(value).toArray()
        const results = await database.getDB().collection("events").findOne(value)
        // console.log(results)
        // console.log(attendees)
        return res.status(200).json({ event: results, attendees: attendees })
    }
})

router.post("/new", passport.authenticate( 'jwt',{ session: false }), async (req, res) => {
    console.log("new")
    const { error, value } = addNewEventBodySchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        // console.log(req.body)
        const organizer = await database.getDB().collection("users").findOne({uuid : req.user.uuid})
        console.log(organizer["name"])
        await database.getDB().collection("events").insertOne({ ...value, organizer: organizer["name"], uuid: uuidv4(), likes : 0, liked : 0 })
        return res.status(200).json({ success: true })
    }
})

module.exports = router