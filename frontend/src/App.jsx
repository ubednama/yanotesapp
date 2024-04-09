import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <Router>
        <NoteState>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
