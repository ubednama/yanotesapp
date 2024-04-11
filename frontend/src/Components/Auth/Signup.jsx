import { Link } from "react-router-dom";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import useSignup from "../../hooks/useSignup";

const Signup = ({ isSignUp }) => {

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { loading, auth } = isSignUp ? useSignup() : useLogin();

    const authUser = async (e) => {
        e.preventDefault();
        if (isSignUp)
            await auth(fullName, username, email, password)
        else await auth(username, password)

    }

    return (
        <div className="container p-5" style={{ maxWidth: "450px" }}>

            <form onSubmit={authUser} className="border p-4 border-secondary-subtle border-2 rounded-3 bg-dark text-light" style={{ opacity: "0.9" }}>
                <div className={`${isSignUp ? "" : 'd-none'} mb-3`}>
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control border-success bg-secondary-subtle" id="fullName" aria-describedby="fullNameHelp" onChange={(e) => setFullName(e.target.value)} value={fullName} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control border-success bg-secondary-subtle" id="username" aria-describedby="usernameHelp" onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div className={`${isSignUp ? "" : 'd-none'} mb-3`}>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control border-success bg-secondary-subtle" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <div id="emailHelp" className="form-text text-white-50">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control border-success bg-secondary-subtle" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input bg-secondary-subtle" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-primary mb-3 d-flex align-items-center justify-content-center" style={{width: "6rem",  height: "2.5rem"}} disabled={loading}>
                        {loading ? 
                            <div className="spinner-border "  role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        : (isSignUp ? "Signup" : "Login")}
                    </button>
                </div>
                <p className="">{isSignUp ? "Don't" : "Already"} have Account? <Link to={isSignUp ? "/" : "/signup"} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">{isSignUp ? "Login" : "Signup"} Instead</Link></p>
            </form>
        </div>
    )
}

export default Signup;