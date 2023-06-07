const express = require("express")
const database = require("../database")
const { v4: uuidv4 } = require('uuid')
const { fetchSingleEventParamsSchema, addNewEventBodySchema } = require("../requestSchemas")
const passport = require("passport")
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const isImageURL = async url => {
    if (!url) return false
    try {
        const response = await fetch(url, { method: "HEAD"})
        const contentType = response.headers.get("content-type")
        return contentType && contentType.startsWith("image/")
    }
    catch (err) {
        console.error(err)
        return false
    }
}

router.get("/:uuid",  passport.authenticate( 'jwt',{ session: false }), async (req, res) => {
    const { error, value } = fetchSingleEventParamsSchema.validate(req.params)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        // console.log("uuid")
        // console.log(value)
        const attendees = await database.getDB().collection("attendances").find(value).toArray()
        var result = await database.getDB().collection("events").findOne(value)
        
        const liked_events = await database.getDB().collection("likes").find({user : req.user.uuid}).toArray()

        // console.log(liked_events)

        if (liked_events.some(obj => obj["uuid"] == result.uuid)){
            resul = {...result, liked : 1}
            // console.log(result)
        }else{
            result = {...result, liked : 0}
        }
        // console.log(attendees)
        return res.status(200).json({ event: result, attendees: attendees })
    }
})

router.post("/new", passport.authenticate( 'jwt',{ session: false }), async (req, res) => {
    // console.log("new")
    const { error, value } = addNewEventBodySchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        // console.log(req.body)
        const organizer = await database.getDB().collection("users").findOne({uuid : req.user.uuid})
        console.log(organizer["name"])
        const isImgURL = await isImageURL(value.banner)
        if (!isImgURL) return res.status(400).json({ success: false, message: "Use an actual image URL" })
        await database.getDB().collection("events").insertOne({ ...value, organizer: organizer["name"], uuid: uuidv4(), likes : 0, liked : 0 })
        return res.status(200).json({ success: true })
    }
})

module.exports = router