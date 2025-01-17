import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const notesinitial = []
    const host = "http://localhost:4000"
    const [notes, setnotes] = useState(notesinitial)

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4MjRhODliYTM0NDU5Yzc3ZjUxMTE4In0sImlhdCI6MTczNjc0OTQ5OX0.vVLXX77xehwOgOkjZRqPVfnXXph4hBKykBvAGfCqwWQ'
            }
        });
        const json = await response.json()
        // console.log(json);
        setnotes(json)
    }

    const addNote = async (title, description, tag) => {
        console.log("Adding new note");
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4MjRhODliYTM0NDU5Yzc3ZjUxMTE4In0sImlhdCI6MTczNjc0OTQ5OX0.vVLXX77xehwOgOkjZRqPVfnXXph4hBKykBvAGfCqwWQ'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        // console.log(json);
        setnotes(json)
        // console.log(title, description, tag);
        const note = {
            "_id": `${Math.random(1)}767880013bf22303401ff1abb`,
            "user": "67824a89ba34459c77f51118",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "1736966163568",
            "__v": 0
        }
        setnotes(notes.concat(note))
    }

    const deleteNote = async (id) => {
        console.log("Deleting note with id" + id);
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4MjRhODliYTM0NDU5Yzc3ZjUxMTE4In0sImlhdCI6MTczNjc0OTQ5OX0.vVLXX77xehwOgOkjZRqPVfnXXph4hBKykBvAGfCqwWQ'
            }
        });
        const json = await response.json()
        // console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)

    }

    const editNote = async (id, title, description, tag) => {
        console.log(id);
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4MjRhODliYTM0NDU5Yzc3ZjUxMTE4In0sImlhdCI6MTczNjc0OTQ5OX0.vVLXX77xehwOgOkjZRqPVfnXXph4hBKykBvAGfCqwWQ'
            },
            body: JSON.stringify({ title, description, tag })
        })
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }
    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;