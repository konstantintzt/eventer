const express = require("express")
const database = require("../database")
const { addLikeBodySchema } = require("../requestSchemas")
const passport = require("passport")
const router = express.Router()

router.post("/", passport.authenticate( 'jwt',{ session: false }),  async (req, res) => {
    const { error, value } = addLikeBodySchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        const event = await database.getDB().collection("events").findOne({ uuid: value.uuid })
        if (event == null) return res.status(400).json({ error: "Event does not exist" })
        else {
            const like_count = await database.getDB().collection("likes").countDocuments({ uuid : value.uuid })
            const liked = await database.getDB().collection("likes").countDocuments({ uuid : value.uuid, user: req.user.uuid})
            if ((liked == 0) && (value.like == 1)){
                await database.getDB().collection("likes").insertOne({ uuid : value.uuid, user: req.user.uuid})
                return res.status(200).json({ liked: 1, like_count: like_count + 1})
            }
            return res.status(200).json({ liked: liked, like_count: like_count })

        }    }
})

module.exports = router