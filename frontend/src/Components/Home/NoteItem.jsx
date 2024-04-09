import React from "react";

const NoteItem = (props) => {
    const { note } = props
    return (
        <div className="card m-2" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <a href="#" className="btn btn-primary">{note.tag}</a>
            </div>
        </div>
    )
}

export default NoteItem;