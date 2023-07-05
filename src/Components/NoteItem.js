import React,{useContext} from 'react';
import noteContext from '../context/Notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {DeleteNote} = context;
   const {note,updateNote} = props;
  return (
    <div className='col-md-4 my-3'>
      <div className="card">
  <div className="card-body">
  <div className="d-flex justify-content-between">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{DeleteNote(note._id);props.showAlert("Deleted successfully", "success")}}></i>
  </div>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>
  </div>
</div>
    </div>
  )
}

export default NoteItem
