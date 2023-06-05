const express = require("express")
const database = require("../database")
const { fetchEventsQuerySchema } = require("../requestSchemas")
const passport = require("passport")
const router = express.Router()

// passport.authenticate( 'jwt',{ session: false }),
router.post("/",  async (req, res) => {
    const { error, value } = fetchEventsQuerySchema.validate(req.query)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        if (value.before != undefined) value.date = { $lte: value.before }
        if (value.after != undefined) value.date = { ...value.date, $gte: value.after }
        if (value.search != undefined) {
            value.$or = [
                { title: { $regex: new RegExp(value.search, "i") } },
                { description: { $regex: new RegExp(value.search, "i") } }
            ]
        }
        value.search = undefined
        value.before = undefined
        value.after = undefined
        var results = await database.getDB().collection("events").find(value).toArray()
        
        const liked_events = await database.getDB().collection("likes").find({user : req.body.user.uuid}).toArray()

        console.log(liked_events)

        results = results.map((result) => {
            if (liked_events.some(obj => obj["uuid"] == result.uuid)){
                result = {...result, liked : 1}
                console.log(result)
            }else{
                result = {...result, liked : 0}
            }
            return result
        })

        /*
        Request Format: User UUID
        */

        // Fetch user history and available events.
        // Call Recommendation Engine
        fetch('http://127.0.0.1:'+process.env.ENGINE_PORT+'/recommend', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: res.status(200).json(results)
        })
           .then(response => response.json())

        const event = await database.getDB().collection("events").findOne({ uuid: value.uuid })
        if (event == null) return res.status(400).json({ error: "Event does not exist" })
        else {
            const exists = await database.getDB().collection("attendances").countDocuments({...value, user: req.user.uuid})
            const attendee = await database.getDB().collection("users").findOne({uuid : req.user.uuid})
            if (exists == 0){
                await database.getDB().collection("attendances").insertOne({...value, name: attendee.name, user: req.user.uuid, confirmed: Math.floor(Date.now()/1000)})
            }
            return res.status(200).json({ success: true })
        }
    }
})

module.exports = router