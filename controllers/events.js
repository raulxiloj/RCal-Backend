const { response } = require("express");

const createEvent = (req, res = response) => {

    res.status(201).json({
        ok: true,
        msg: 'Event created'
    });

}

const getEvents = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Events retrieved'
    });

}

const updateEvent = (req, res = response) => {

    const { id } = req.params;

    console.log(id);

    res.status(200).json({
        ok: true,
        msg: 'Event updated'
    });

}

const deleteEvent = (req, res = response) => {

    const { id } = req.params;

    console.log(id);

    res.status(200).json({
        ok: true,
        msg: 'Event deleted'
    });

}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
};