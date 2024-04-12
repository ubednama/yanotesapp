import fetchUser from "../middleware/fetchUser.js";
import Note from "../models/Note.js";
import express from "express"

const router = express.Router();

// get all notes
router.get("/", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json({success : true , notes});
        // console.log(req.body)
        // res.send("Hello")
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, error: "Internal Server Error"});
    }
});


export default router;