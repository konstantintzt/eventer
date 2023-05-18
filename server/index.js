const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const passport = require("passport")
const session = require('express-session');

dotenv.config()
const app = express()
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});

async function main() {
    const database = await require("./database").connect(process.env.MONGO_URI)

    app.use("/events", require("./routes/events"))
    app.use("/event", require("./routes/event"))
    app.use("/attend", require("./routes/attend"))
    app.use("/", require("./routes/404"))

    var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

    passport.use(new GoogleStrategy({
        clientID:     "588092924792-pn199a7ipp505p3ilu1k3d1enttnlvvs.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://127.0.0.1:2902/auth/google/callback",
        passReqToCallback   : false,
        scope: [ 'email', 'profile' ]
      },
      function(request, accessToken, refreshToken, profile, done) {
        console.log(request)
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)
        database.collection("user").insertOne(
            {"googleId": profile.id }
        )
        return done(false, true)
        }
    ));

    app.get('/auth/google',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
    ));

    app.get( '/auth/google/callback',
        passport.authenticate( 'google', 
        {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure'
        }
        // function(err, user, info) {
        //     console.log("authenticate");
        //     console.log(err);
        //     console.log(user);
        //     console.log(info);
        // }
        ));

    app.get( '/auth/google/success', 
    async (req, res) => {
        return res.status(200).json({success: true})
    })

    app.get( '/auth/google/failure',    
    passport.authenticate('google'),
    async (req, res) => {
        return res.status(200)
    })

    app.listen(process.env.PORT, () => {
        console.log("API is running on port " + process.env.PORT)
    })
}

main().catch(console.error)