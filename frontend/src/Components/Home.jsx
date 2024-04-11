import React from 'react'
import AddNote from './Home/AddNote';
import Notes from './Home/Notes';

const Home = () => {

  return (
    <div>
      <h1>Add a Note</h1>
        <AddNote />
      <h1>Your Notes</h1>
        <Notes />
    </div>
  )
}

export default Home
