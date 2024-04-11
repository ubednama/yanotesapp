import express from "express";
import Note from "../models/Note.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

let success = false;
// get all notes
// router.get("/", fetchUser, async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id });
//         res.json(notes);
//         // console.log(req.body)
//         // res.send("Hello")
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

//add note
router.post(
    "/add",
    fetchUser,
    [body("title", "Give your note title").isLength({ min: 1 })],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            success = true
            const savedNotes = await note.save();
            res.status(200).json({success, savedNotes});
        } catch (error) {
            console.error(error.message);
            res.status(500).json({success, error: "Internal Server Error"});
        }
    }
);

// update notes
router.put("/edit/:id", fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({success, error: "File not found"});
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({success, error: "Access denied"});
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        success = true
        res.status(200).json({success, note });
    } catch (error) {
        console.log("Error at note delete ", error)
        res.status(500).json({success, error: "Internal Server Error"});
    }
});

router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({success, error:"File not found"});
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({success, error: "Access denied"});
        }
        success = true
        note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ success, message: "Note was deleted", note: note });
    } catch (error) {
        console.log("Error at note delete ", error)
        res.status(500).json({success, error: "Internal Server Error"});
    }
});

export default router;
