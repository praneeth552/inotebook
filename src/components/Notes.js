import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from "./Noteitem"
import Addnote from './addnote'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        getNotes()
    })

    const ref = useRef(null)
    const ref2 = useRef(null)
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const updateNote = (currentNote) => {
        // console.log(currentNote);
        ref.current.click();
        // console.log(ref.current);
        // setnote({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
        setnote(currentNote)
    }

    const handleClick = (e) => {
        console.log("updating the note.. ", note);
        e.preventDefault()
        editNote(note._id, note.title, note.description, note.tag)
        // const closenote = document.querySelector("#closenote")
        // console.log(closenote);
        // closenote.click()
        ref2.current.click()
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label" >Title</label>
                                <input type="text" className="form-control" onChange={onChange} id="title" name="title" value={note.title} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label" >Description</label>
                                <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label" >Tag</label>
                                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='closenote' ref={ref2}>Close</button>
                            <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem note={note} key={note._id} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes