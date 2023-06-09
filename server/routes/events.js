const express = require("express")
const database = require("../database")
const { fetchEventsQuerySchema } = require("../requestSchemas")
const passport = require("passport")

const router = express.Router()

router.get("/", passport.authenticate( 'jwt',{ session: false }), async (req, res) => {
    const { error, value } = fetchEventsQuerySchema.validate(req.query)
    console.log(req.user.uuid)
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

        const sort = { date: -1 };

        var results = await database.getDB().collection("events").find(value).sort(sort).toArray()
        
        const liked_events = await database.getDB().collection("likes").find({user : req.user.uuid}).toArray()

        // console.log(liked_events)

        results = results.map((result) => {
            if (liked_events.some(obj => obj["uuid"] == result.uuid)){
                result = {...result, liked : 1}
                // console.log(result)
            }else{
                result = {...result, liked : 0}
            }
            return result
        })

        // console.log(results)

        return res.status(200).json(results)
    }
})

module.exports = router