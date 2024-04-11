import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./Components/Auth/Signup";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const {authUser} = useAuthContext();
  return (
    <>
      <Router>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
              <Route path="/login" element={authUser ? <Navigate to='/'/> : <Signup />}/>
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={authUser ? <Navigate to="/"/> :  <Signup isSignUp={true} />} />
            </Routes>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
      </Router>
    </>
  );
}

export default App;
