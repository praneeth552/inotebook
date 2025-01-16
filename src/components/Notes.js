import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from "./Noteitem"
import Addnote from './addnote'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes } = context
    return (
        <>
            <Addnote/>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem note={note} key={note._id} />
                })}
            </div>
        </>
    )
}

export default Notes