const express = require("express")
const database = require("../database")
const { fetchSingleEventParamsSchema } = require("../requestSchemas")
const passport = require("passport")
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


router.get("/",  passport.authenticate( 'jwt',{ session: false }), async (req, res) => {
    try{
        /*
        Request Format: User UUID
        */

        // Fetch user history and available events.
        // Call Recommendation Engine
        console.log(req.user.uuid)
        console.log(JSON.stringify({ "uuid": req.user.uuid }))
        const response = await fetch('http://127.0.0.1:'+process.env.ENGINE_PORT+'/recommend', {
            method: 'POST',
            body: JSON.stringify({ "uuid": req.user.uuid })
        })
        const data = await response.json()
        return res.status(200).json(data['ordered_events'])

    }catch(e){
        return res.status(400)
    }
})

module.exports = router