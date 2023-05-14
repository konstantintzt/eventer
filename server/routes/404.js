const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {
    return res.status(404).json({ success: false, message: "Not Found" })
})

module.exports = router