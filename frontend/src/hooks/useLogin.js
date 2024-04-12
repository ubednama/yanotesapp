import { useState } from 'react';
import { toast } from 'react-toastify';
import BASE_URL from '../Components/Utils/constant';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const auth = async (username, password) => {
        const success = handleInputErrors({ username, password })
        if (!success) return;
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: `POST`,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            })
            const json = await response.json()
            if (!response.ok) throw new Error( json.message || 'Failed to authenticate')
            if(json.error){
                throw new Error(data.error)         //this throws error that we catch below
            }
            console.log(json)
            localStorage.setItem("jwtToken", json.authToken)

            // const authToken = json.authToken;
            setAuthUser(json);
            console.log("from login",setAuthUser)
            toast.success(`Welcome Back ${username}`)


        } catch (error) { 
            toast.error(error.message || "Error in authentication")
            console.error("Error in authentication", error) }
        finally { setLoading(false) }
    }
    return { loading, auth }
}

export default useLogin;


function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!username || !password) {
        toast.error("Please fill all fields")
        return false
    }

    return true
}