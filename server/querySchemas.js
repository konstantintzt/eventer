const Joi = require("joi")

const fetchEventsSchema = Joi.object({
    organizer: Joi.string(),
    zip: Joi.number().integer().min(1).max(99950),
    type: Joi.number().integer().min(0).max(5),
    after: Joi.number().min(0).max(Number.MAX_SAFE_INTEGER),
    before: Joi.number().min(0).max(Number.MAX_SAFE_INTEGER)
})

module.exports = { fetchEventsSchema }