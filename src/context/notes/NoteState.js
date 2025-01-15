import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const notesinitial = [
        {
            "_id": "6784e24a623aeab09133acba",
            "user": "67824a89ba34459c77f51118",
            "title": "My Note",
            "description": "I need to apply for ssc in army",
            "tag": "personal",
            "date": "1736761930425",
            "__v": 0
        },
        {
            "_id": "6784e67a623aeab09133acbd",
            "user": "67824a89ba34459c77f51118",
            "title": "Note2",
            "description": "Study hard",
            "tag": "personal",
            "date": "1736763002831",
            "__v": 0
        },
        {
            "_id": "6784e6a3623aeab09133acc0",
            "user": "67824a89ba34459c77f51118",
            "title": "Note3",
            "description": "help parents financially",
            "tag": "personal",
            "date": "1736763043133",
            "__v": 0
        },
        {
            "_id": "6784eb13564ad20f4c42e015",
            "user": "67824a89ba34459c77f51118",
            "title": "learn",
            "description": "I want to learn History and more in order to clear the CDS exam",
            "tag": "Important",
            "date": "1736764179162",
            "__v": 0
        },
        {
            "_id": "67880013bf22303401ff1abb",
            "user": "67824a89ba34459c77f51118",
            "title": "Note6",
            "description": "Useless Note",
            "tag": "Nothing",
            "date": "1736966163568",
            "__v": 0
        },
        {
            "_id": "6784eb13564ad20f4c42e015",
            "user": "67824a89ba34459c77f51118",
            "title": "learn",
            "description": "I want to learn History and more in order to clear the CDS exam",
            "tag": "Important",
            "date": "1736764179162",
            "__v": 0
        },
        {
            "_id": "67880013bf22303401ff1abb",
            "user": "67824a89ba34459c77f51118",
            "title": "Note6",
            "description": "Useless Note",
            "tag": "Nothing",
            "date": "1736966163568",
            "__v": 0
        }
    ]

    const [notes, setnotes] = useState(notesinitial)
    return (
        <noteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;