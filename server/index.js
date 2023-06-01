const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const passport = require("passport")
const session = require("express-session")
const cors = require("cors")


dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cors())


async function main() {
    const database = await require("./database").connect(process.env.MONGO_URI)

    const unless = function(middleware, ...paths) {
        return function(req, res, next) {
          const pathCheck = paths.some(path => path === req.path);
          pathCheck ? next() : middleware(req, res, next);
        };
      };
      
    
    app.use("/events", require("./routes/events"))
    app.use("/event", require("./routes/event"))
    app.use("/attend", require("./routes/attend"))
    app.use("/auth", require("./routes/passport.js"))
    app.use("/", require("./routes/404"))
    app.use('/test', express.static('public'))
    // app.use(unless(passport.authenticate( 'jwt',{ session: false }), "/auth/verify_token", "/test/index.html","/test/temp.html"))
    app.listen(process.env.PORT, () => {
        console.log("API is running on port " + process.env.PORT)
    })
}

main().catch(console.error)