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
        // console.log(event)
        if (event == null) return res.status(400).json({ error: "Event does not exist" })
        else {
            const like_count = await database.getDB().collection("likes").countDocuments({ uuid : value.uuid })
            const liked = await database.getDB().collection("likes").countDocuments({ uuid : value.uuid, user: req.user.uuid})
            if ((liked == 0) && (value.like == 1)){
                await database.getDB().collection("likes").insertOne({ uuid : value.uuid, user: req.user.uuid})
                // create a filter for a movie to update
                const filter = { uuid: value.uuid };
                // create a document that sets the plot of the movie
                const updateDoc = {
                $set: {
                    likes: event.likes + 1
                    },
                };
                await database.getDB().collection("events").updateOne(filter, updateDoc);
                return res.status(200).json({ liked: 1, like_count: event.likes + 1})
            }
            // else if ((liked == 1) && (value.like == 0)){
            //     await database.getDB().collection("likes").insertOne({ uuid : value.uuid, user: req.user.uuid})
            //     // create a filter for a movie to update
            //     const filter = { uuid: value.uuid };
            //     // create a document that sets the plot of the movie
            //     const updateDoc = {
            //     $set: {
            //         likes: event.likes - 1
            //         },
            //     };
            //     await database.getDB().collection("events").updateOne(filter, updateDoc);
            //     return res.status(200).json({ liked: 0, like_count: event.likes - 1})
            // }
            return res.status(200).json({ liked: liked, like_count: like_count })

        }    }
})

module.exports = router