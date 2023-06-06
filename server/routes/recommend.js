const express = require("express")
const database = require("../database")
const { fetchSingleEventParamsSchema } = require("../requestSchemas")
const passport = require("passport")
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// passport.authenticate( 'jwt',{ session: false }),
router.get("/",  async (req, res) => {
    const { error, value } = fetchSingleEventParamsSchema.validate(req.query)
    if (error) return res.status(400).json({ error: error.details[0].message })
    else {
        /*
        Request Format: User UUID
        */

        // Fetch user history and available events.
        // Call Recommendation Engine
        console.log(req.query.uuid)
        console.log(JSON.stringify({ "uuid": req.query.uuid }))
        const response = await fetch('http://127.0.0.1:'+process.env.ENGINE_PORT+'/recommend', {
            method: 'POST',
            body: JSON.stringify({ "uuid": req.query.uuid })
        })
        const data = await response.json()
        res.json(data);
    }
})

module.exports = router