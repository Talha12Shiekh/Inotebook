import React, { useState, useContext } from 'react'
import noteContext from '../context/Notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { Addnote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const Handleclick = (e) => {
        e.preventDefault();
        Addnote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showAlert("Added successfully", "success")
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <div className="container my-3">
                <h1>Add a note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Add title</label>
                        <input type="text" value={note.title} className="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={onchange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Add description</label>
                        <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onchange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Add tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onchange} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={Handleclick} disabled={note.title.length < 5 || note.description.length < 5}>Add note</button>
                </form>

            </div>
        </div>
    )
}

export default AddNote
