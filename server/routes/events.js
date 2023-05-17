const express = require("express")
const database = require("../database")
const { fetchEventsQuerySchema } = require("../requestSchemas")

const router = express.Router()

router.get("/", async (req, res) => {
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
        const results = await database.getDB().collection("events").find(value).toArray()
        return res.status(200).json(results)
    }
})

module.exports = router