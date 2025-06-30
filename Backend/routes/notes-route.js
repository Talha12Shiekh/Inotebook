const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewears/fetchuser");
const Note = require("../models/notes-model");
const { body, validationResult } = require('express-validator');

router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.verifiedid });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred !");
    }
});

router.post("/addnote", fetchUser, [
    body("title", "Enter a valid title !").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters !").isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag, date } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, date, user: req.verifiedid
        });

        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred !");
    }

});

router.put("/updatenote/:id", fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {

        const updatedNote = {};
        if (title) updatedNote.title = title;
        if (description) updatedNote.description = description;
        if (tag) updatedNote.tag = tag;

        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).send("Not found!");

        if (note.user.toString() != req.verifiedid) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: updatedNote }, { new: true });

        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred !");
    }


});

router.delete("/deletenote/:id", fetchUser, async (req, res) => {

    try {

        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).send("Not found!");

        // checking that the user is deleting his own note
        if (note.user.toString() != req.verifiedid) {
            return res.status(401).send("Not allowed");
        }

        let deletednote = await Note.findByIdAndDelete(req.params.id, { new: true });

        res.json(deletednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred !");
    }

})

module.exports = router;