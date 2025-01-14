import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
import { useEffect } from 'react'

const About = () => {
  const a = useContext(noteContext)

  useEffect(() => {
    a.update()
  })
  
  return (
    <div>
      This is a About {a.state.name} and his age is {a.state.age}
    </div>
  )
}

export default About
