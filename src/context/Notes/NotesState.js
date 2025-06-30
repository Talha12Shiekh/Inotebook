import { useState } from 'react';
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialnotes = [];

  const [notes, setnotes] = useState(initialnotes)

  // Add a note
  const Addnote = async (title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    let note = await response.json();
    console.log(note);
    setnotes(p => [...p,note]);
  }

  // get all notes
  const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setnotes(json);
  }
  // Delete a note
  const DeleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token')
      },
    });
    const newNotes = notes.filter((note) =>  note._id !== id )
    setnotes(newNotes);
  }

  //Edit a note
  const EditNote = async (id, title, description, tag) => {
    // API call
    // eslint-disable-next-line
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Editing note
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title; 
        newNotes[i].description = description; 
        newNotes[i].tag = tag; 
        break;
      }
    }
    
    setnotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, setnotes, Addnote, DeleteNote, EditNote, getnote }}>
      {props.children};
    </NoteContext.Provider>
  )
}
export default NoteState;
