const { Router } = require("express");
const checkJWT = require("../middlewares/check-jwt");
const { createEvent, getEvents, updateEvent, deleteEvent } = require("../controllers/events");
const router = Router();

router.use(checkJWT);

router.post('/create', createEvent);
router.get('/', getEvents);
router.put('/update/:id', updateEvent);
router.delete('/delete/:id', deleteEvent);

module.exports = router;