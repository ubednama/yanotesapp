import { useState } from "react";
import NoteContext from "./NoteContext";
import { toast } from 'react-toastify';
import BASE_URL from "../../Components/Utils/constant";


const NoteState = (props)=> {
      const [notes, setNotes] = useState([])
      const authToken = localStorage.getItem("jwtToken")

      const getAllNotes = async()=>{
        const response = await fetch(`${BASE_URL}/`, {
          method: "GET",
          headers: {
            'Content-Type' : 'application/json',
            'auth-token' : authToken
          }
        })
        const json = await response.json()
        console.log("from getAllNotes ",json)
        // console.log(authToken, typeof authToken)
        setNotes(json.notes)
      }

      const addNote = async(title, description, tag) => {
        console.log("adding a new note")
        const data = {
          title,
          description,
          tag
        }
        const response = await fetch(`${BASE_URL}/api/notes/add`, {
          method: "POST",
          headers: {
            'Content-Type' : 'application/json',
            'auth-token' : authToken
          },
          body: JSON.stringify(data)
        })
        // setNotes(notes.concat(note))
        const json = await response.json()
        console.log(json)
        if(!response.ok){
          toast.error("Failed to add Note")
        }
        getAllNotes()
        toast.success("Note added Successfully")
        // setNotes(notes.concat(json))
      }

      const deleteNote = async (id) => {
        const response = await fetch(`${BASE_URL}/api/notes/delete/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type' : 'application/json',
            'auth-token' : authToken
          }
        })
        const json = await response.json()
        if(!response.ok){
          toast.error("Failed to delete Note")
        }
        toast.error("Note deleted Successfully")
        setNotes(notes.filter(note=>note._id!==id))
      }

      const updateNote = async(id, title, description, tag) => {
        console.log("Editing note with id ",id)
        const data = {
          title,
          description,
          tag
        }
        const response = await fetch(`${BASE_URL}/api/notes/edit/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type' : 'application/json',
            'auth-token' : authToken
          },
          body: JSON.stringify(data)
        })
        const json = await response.json()
        if(!response.ok){
          toast.error("Failed to update Note")
        }
        getAllNotes()
        toast.success("Note edited Successfully")
      //   let newNotes = JSON.parse(JSON.stringify(notes))


      //   for (let i = 0; i<newNotes.length; i++) {
      //     const element = newNotes[i];
      //     if(element._id === id) {
      //       newNotes[i].title = title;
      //       newNotes[i].description = description;
      //       newNotes[i].tag = tag;
      //       break;
      //     }
      //   }
      //   setNotes(newNotes)
      }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;