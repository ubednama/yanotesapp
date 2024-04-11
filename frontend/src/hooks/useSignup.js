import { useState } from 'react';
import { toast } from 'react-toastify';
import BASE_URL from '../Components/Utils/constant';
import { useAuthContext } from '../context/AuthContext';

const useSingup = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const auth = async (fullName, username, email, password) => {
        setLoading(true)
        const success = handleInputErrors({ fullName, username, email, password })
        if (!success) return;
        try {
            const response = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: `POST`,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ fullName, username, email, password })
            })
            console.log(response)
            const json = await response.json()
            console.log(json)
            if (!response.ok) throw new Error('Failed to authenticate')
            if(json.error){
                throw new Error(data.error)         //this throws error that we catch below
            }
            console.log(json)
            localStorage.setItem("jwtToken", JSON.stringify(json))

            // const authToken = json.authToken;
            setAuthUser(json);
            toast.success("Account created successfully")
            toast.success(`Welcome ${username}`)


        } catch (error) { 
            toast.error("Error in authentication")
            console.error("Error in authentication", error) }
        finally { setLoading(false) }
    }
    return { loading, auth }
}

export default useSingup;


function handleInputErrors({ fullName, username, email, password }) {
    if (!username || !password || !fullName || !email) {
        toast.error("Please enter all fields")
        return false
    }

    return true
}