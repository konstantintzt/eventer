const express = require("express")
const passport = require("passport")
const database = require("../database")
const jwt =  require('jsonwebtoken')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const { ref } = require("joi")
const {OAuth2Client} = require('google-auth-library')
const { v4: uuidv4 } = require('uuid')
const client = new OAuth2Client("588092924792-o3h09qv5dc5jrm4l80tgdjp62kr9e60g.apps.googleusercontent.com")

const router = express.Router()

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    // jwtFromRequest: ExtractJWT.fromHeader("Authorization"),
    secretOrKey: "foobar",
    passReqToCallback: true
  };

passport.use(
    'jwt',
    new JWTstrategy (opts, async (req, jwt_payload, done) => {

        const exists = await database.getDB().collection("user").countDocuments({"uuid":jwt_payload["uuid"]})
        if (exists > 0){
            console.log("verified")
            done(null, jwt_payload)
        }else{
            done(false, jwt_payload)
            }
        }
    )
);

router.post( '/verify_token',    
    async (req, res) => {
        console.log(req.body)
        try{
            const ticket = await client.verifyIdToken({
                idToken:  req.body["credential"],
                audience: "588092924792-o3h09qv5dc5jrm4l80tgdjp62kr9e60g.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            })
        }
        catch (err) {
            return res.status(400).json({token})
        }
        const payload = ticket.getPayload()
        console.log(payload);
        // const userid = payload['sub'];
        const userid = payload['sub']
        console.log(userid);
        const domain = payload['hd']
        
        const exists = await database.getDB().collection("users").countDocuments({"email":payload["email"]})
        console.log(exists)
        console.log("foo")
        var token = 0
        if (exists > 0){
            console.log("found")
            const user = await database.getDB().collection("users").findOne({"email":payload["email"]});
            token = jwt.sign({ uuid: user.uuid }, "foobar", {
                expiresIn: 60*60*24
              })
            //   return res.status(200).json({token})
            }
        else{
            console.log("inserting")
            const newuuid = uuidv4()
            const foo = await database.getDB().collection("users").insertOne({"name": payload["name"],"email":payload["email"], uuid: newuuid})
            console.log(foo)
            token = jwt.sign({ uuid: newuuid }, "foobar", {
                expiresIn: 60*60*24,
              })
        }
        console.log(token)
        return res.status(200).json({token})
    }
)


module.exports = router
