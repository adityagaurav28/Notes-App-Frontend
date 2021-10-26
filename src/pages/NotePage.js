import React, {useState, useEffect} from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";


const NotePage = ({match, history}) => {

    let noteId = match.params.id
    let [note, setNote] = useState([])

    useEffect(() => {
        getNote()
    }, [noteId]) // eslint-disable-line react-hooks/exhaustive-deps

    let getNote = async () => {
        if (noteId === 'new') return
        let response = await fetch(`https://the-notes-app-backend.herokuapp.com/api/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch('https://the-notes-app-backend.herokuapp.com/api/notes/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`https://the-notes-app-backend.herokuapp.com/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`https://the-notes-app-backend.herokuapp.com/api/notes/${noteId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        history.push('/')
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && !note.body) {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note !== null) {
            createNote()
        }
        history.push('/')
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value}) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage;