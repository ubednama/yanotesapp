import fetchUser from "../middleware/fetchUser.js";
import Note from "../models/Note.js";
import express from "express"
const router = express.Router();

// get all notes
let success = false
router.get("/", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        success = true
        res.json({success, notes});
        // console.log(req.body)
        // res.send("Hello")
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success, error: "Internal Server Error"});
    }
});


export default router;