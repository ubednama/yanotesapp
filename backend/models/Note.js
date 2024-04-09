import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type:Date,
        default: Date.now
    }
});

const Note = mongoose.model("Note", notesSchema);

export default Note;