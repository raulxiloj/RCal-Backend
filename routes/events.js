/*
    Event routes: /api/events
*/

const { Router } = require("express");
const checkJWT = require("../middlewares/check-jwt");
const { createEvent, getEvents, updateEvent, deleteEvent } = require("../controllers/events");
const { check } = require("express-validator");
const fieldValidator = require("../middlewares/field-validator");
const isDate = require("../helpers/isDate");
const router = Router();

//All routes need to be validated by the JWT
router.use(checkJWT);

//Create an event
router.post('/create',
    [
        check('title', 'The title is required').notEmpty(),
        check('start', 'Starting date is required').custom(isDate),
        check('end', 'Ending date is required').custom(isDate),
        fieldValidator
    ],
    createEvent);

//Get all the events    
router.get('/', getEvents);

//Update an event
router.put('/update/:id',
    [
        check('title', 'The title is required').notEmpty(),
        check('start', 'Starting date is required').custom(isDate),
        check('end', 'Ending date is required').custom(isDate),
        fieldValidator
    ]
    , updateEvent);

//Delete an event
router.delete('/delete/:id', deleteEvent);

module.exports = router;