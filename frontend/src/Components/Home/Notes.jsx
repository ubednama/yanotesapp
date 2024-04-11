import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../../context/notes/NoteContext';
import NoteItem from './NoteItem';
import Modal from './Modal';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getAllNotes, updateNote } = context
    const [note, setNote] = useState({ title: "", description: '', tag: '' })

    useEffect(() => {
        getAllNotes();
    }, [])

    const ref = useRef(null)

    const editNote = (prevNote) => {
        ref.current.click();
        setNote(prevNote)

    }

    const onChange = (e) => {
        const {name, value} = e.target
        setNote({...note, [name]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("on submit clicked")
        updateNote(note._id, note.title, note.description, note.tag)
        setNote({ title: "", description: '', tag: '' })
        console.log("from onSubmit",note)
    }

    return (
      <>
    {/* <Modal ref={ref} /> */}
        <div>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
            </button>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input type="text" className="form-control" id="title" aria-describedby="title" required name="title" onChange={onChange} value={note.title} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">
                                Tag
                            </label>
                            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onSubmit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container row justify-content-md-center'>
            { notes.length !== 0 ? (
            notes.map((note) => {
                return <NoteItem key={note._id} editNote={editNote} note={note} />
            })) : 'You dont have any notes'}
        </div>
      </>
    )
}

export default Notes;