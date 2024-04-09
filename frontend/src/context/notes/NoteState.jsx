import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props)=> {
    const initialNotes = [
        {
            "_id": "66156e0f6cfb1b3c3965c453",
            "user": "6613e533a4330392205d9f88",
            "title": "test2",
            "description": "description test2",
            "tag": "test2",
            "date": "2024-04-09T16:34:23.489Z",
            "__v": 0
          },
          {
            "_id": "66156e106cfb1b3c3965c455",
            "user": "6613e533a4330392205d9f88",
            "title": "test2",
            "description": "description test2",
            "tag": "test2",
            "date": "2024-04-09T16:34:24.529Z",
            "__v": 0
          },
          {
            "_id": "66156e106cfb1b3c3965c457",
            "user": "6613e533a4330392205d9f88",
            "title": "test2",
            "description": "description test2",
            "tag": "test2",
            "date": "2024-04-09T16:34:24.903Z",
            "__v": 0
          }
      ];

      const [notes, setNotes] = useState(initialNotes)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;