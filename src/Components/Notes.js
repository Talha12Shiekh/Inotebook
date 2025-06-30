import React, { useContext, useEffect, useRef,useState } from 'react';

import noteContext from '../context/Notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getnote ,EditNote} = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getnote();
    }else{
      navigate("/login");  
    }
    // eslint-disable-next-line
  }, []);
  const [note, setnote] = useState({ eid:"", etitle: "", edescription: "", etag: "" })
  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({eid:currentnote._id,etitle : currentnote.title,edescription : currentnote.description,etag : currentnote.tag});
  }
  const ref = useRef(null);
  const refClose = useRef(null);


  const onchange = (e) => {
      setnote({ ...note, [e.target.name]: e.target.value });
  }

  const Handleclick = (e) => {
    EditNote(note.eid,note.etitle,note.edescription,note.etag)
    e.preventDefault();
    refClose.current.click();
    props.showAlert("Updated successfully", "success")
}
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* form idhar ai ga */}
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Edit title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" aria-describedby="emailHelp" name='etitle' onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Edit description</label>
                  <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Edit tag</label>
                  <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onchange} minLength={5} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={Handleclick} disabled={note.etitle.length<5 ||note.edescription.length<5 } className="btn btn-primary">Update note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your notes</h1>
        <div className="container mx-2">
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updatenote} note={note} showAlert={props.showAlert}/>
        })}
      </div>
    </>
  )
}

export default Notes
