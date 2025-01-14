import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "Harsha",
        "age": "22"
    }

    const [state, setstate] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "Sai Praneeth",
                "age": "18"
            })
        }, 1000);
    }
    return (
        <noteContext.Provider value={{ state, update }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;