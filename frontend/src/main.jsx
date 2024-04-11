import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
// import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'
import { AuthProvider } from './context/AuthContext.jsx'
import NoteState from './context/notes/NoteState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <NoteState>
        <App />
      </NoteState>
    </AuthProvider>
  </React.StrictMode>,
)
