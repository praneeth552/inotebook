import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const Addnote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        props.showAlert("Note Added successfully", "success")
        setnote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='conatiner my-3'>
                <h2>Add Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" >Title</label>
                        <input type="text" className="form-control" onChange={onChange} id="title" name="title" value={note.title}aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description}onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag}onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote