const { response } = require("express");
const Event = require("../models/Event");

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;
        const eventSaved = await event.save();

        res.status(201).json({
            ok: true,
            event: eventSaved
        });


    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }

}

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        events
    });

}

const updateEvent = async (req, res = response) => {

    const { id } = req.params;
    const uid = req.uid;

    try {

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, { new: true });

        res.status(200).json({
            ok: true,
            eventUpdated
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }



}

const deleteEvent = async (req, res = response) => {

    const { id } = req.params;
    const uid = req.uid;

    try {

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized to delete this event'
            });
        }

        await Event.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Event deleted'
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }

}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
};