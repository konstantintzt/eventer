const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const passport = require("passport")
const session = require("express-session")

dotenv.config()
const app = express()
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));



async function main() {
    const database = await require("./database").connect(process.env.MONGO_URI)

    app.use("/events", require("./routes/events"))
    app.use("/event", require("./routes/event"))
    app.use("/attend", require("./routes/attend"))
    app.use("/auth", require("./routes/passport.js"))
    app.use("/", require("./routes/404"))

    app.listen(process.env.PORT, () => {
        console.log("API is running on port " + process.env.PORT)
    })
}

main().catch(console.error)