import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext)
  const {addNote} = context

  const [note, setNote] = useState({title: "", description: '', tag: ""})
  
  const createNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
  }

  const onChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target
    setNote({...note,
      [name]: value
    })
  }
  
  return (
    <div className="container my-3">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            required
            name="title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={createNote}>
          Create Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
