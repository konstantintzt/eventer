const Joi = require("joi")

const fetchEventsQuerySchema = Joi.object({
    organizer: Joi.string(),
    zip: Joi.number().integer().min(1).max(99950),
    type: Joi.number().integer().min(0).max(5),
    after: Joi.number().min(0).max(Number.MAX_SAFE_INTEGER),
    before: Joi.number().min(0).max(Number.MAX_SAFE_INTEGER),
    search: Joi.string()
}).unknown(false)

const fetchSingleEventParamsSchema = Joi.object({
    uuid: Joi.string().guid().required()
}).unknown(false)

const addEventAttendeeBodySchema = Joi.object({
    user: Joi.string().required(),
    uuid: Joi.string().guid().required(),

})

module.exports = { fetchEventsQuerySchema, fetchSingleEventParamsSchema, addEventAttendeeBodySchema }