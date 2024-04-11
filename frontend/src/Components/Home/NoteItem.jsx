import React, { useContext } from "react";
import { toast } from 'react-toastify';
import NoteContext from "../../context/notes/NoteContext";

const NoteItem = (props) => {
    const { note, editNote } = props

    const context = useContext(NoteContext)
    const {deleteNote } = context

    return (
        <div className="card m-2" style={{width: "48%"}}>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title text-break">{note.title}</h5>
                    <div className="d-flex gap-3 align-items-center">
                        <i className="fa-regular fa-trash-can" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-regular fa-pen-to-square" onClick={()=>{editNote(note)}}></i>
                    </div>
                </div>
                <p className="card-text text-break">{note.description}</p>
                <a href="#" className="fst-italic link-success link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">{note.tag !== '' ? `#${note.tag}` : ''}</a>
            </div>
        </div>
    )
}

export default NoteItem;