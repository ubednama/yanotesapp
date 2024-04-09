import React from 'react'
import Form from './Home/Form'

import Notes from './Home/Notes';

const Home = () => {

  return (
    <div>
      <h1>Add a Note</h1>
        <Form />
      <h1>Your Notes</h1>
        <Notes />
    </div>
  )
}

export default Home
