const express = require("express")
const passport = require("passport")
const database = require("../database")
const jwt =  require('jsonwebtoken');
const { ref } = require("joi");

const router = express.Router()

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
    });
    
passport.deserializeUser(function(user, done) {
    done(null, user);
    });

passport.use(new GoogleStrategy({
    clientID:     "588092924792-pn199a7ipp505p3ilu1k3d1enttnlvvs.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://127.0.0.1:2902/auth/google/callback",
    passReqToCallback   : true,
    scope: [ 'email', 'profile' ]
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log(request)
    // console.log(accessToken)
    // console.log(refreshToken)
    // console.log(profile)

    // const database = await require("../database").connect(process.env.MONGO_URI)

    // database.collection("user").insertOne(
    //     {"googleId": profile.id }
    // )
    // request.user = {accessToken: accessToken, refreshToken: refreshToken, profile: profile}
    return done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile}, {accessToken: accessToken, refreshToken: refreshToken, profile: profile})
    }
));


router.get('/google',
passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
));

router.get( '/google/callback',
    passport.authenticate( 'google', 
    {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }
));

router.get( '/google/success', (req, res) => {
    console.log(req.user)
    console.log(JSON.parse(req.sessionStore.sessions[Object.keys(req.sessionStore.sessions)[0]])["passport"])
    return res.status(200).json({success: true})
    }
)

router.get( '/google/failure',    
passport.authenticate('google'),
async (req, res) => {
    return res.status(200)
})

module.exports = router

//   passport.use(
//     'jwt',
//     new JWTstrategy(opts, (jwt_payload, done) => {
//       try {
//         User.findOne({
//           where: {
//             id: jwt_payload.id,
//           },
//         }).then(user => {
//           if (user) {
//             console.log('user found in db in passport');
//             done(null, user);
//           } else {
//             console.log('user not found in db');
//             done(null, false);
//           }
//         });
//       } catch (err) {
//         done(err);
//       }
//     }),
//   );


//   module.exports = app => {
//     app.post('/loginUser', (req, res, next) => {
//       passport.authenticate('login', (err, users, info) => {
//         if (err) {
//           console.error(`error ${err}`);
//         }
//         if (info !== undefined) {
//           console.error(info.message);
//           if (info.message === 'bad username') {
//             res.status(401).send(info.message);
//           } else {
//             res.status(403).send(info.message);
//           }
//         } else {
//           req.logIn(users, () => {
//             User.findOne({
//               where: {
//                 username: req.body.username,
//               },
//             }).then(user => {
//               const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
//                 expiresIn: 60 * 60,
//               });
//               res.status(200).send({
//                 auth: true,
//                 token,
//                 message: 'user found & logged in',
//               });
//             });
//           });
//         }
//       })(req, res, next);
//     });
//   };