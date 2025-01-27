import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const notesinitial = []
    const host = process.env.REACT_APP_API_URL;
    
    const [notes, setnotes] = useState(notesinitial)

    const getNotes = async () => {
        const response = await fetch(`https://inotebook-asn5.onrender.com/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json()
        // console.log(json);
        setnotes(json)
    }

    const addNote = async (title, description, tag) => {
        console.log("Adding new note");
        const response = await fetch(`https://inotebook-asn5.onrender.com/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json()
        // console.log(json);
        // console.log(title, description, tag);
        setnotes(notes.concat(note))
    }

    const deleteNote = async (id) => {
        console.log("Deleting note with id" + id);
        const response = await fetch(`https://inotebook-asn5.onrender.com/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json()
        // console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)

    }

    const editNote = async (id, title, description, tag) => {
        console.log(id);
        const response = await fetch(`https://inotebook-asn5.onrender.com/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break
            }
            setnotes(newNotes)
        }
    }
    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;