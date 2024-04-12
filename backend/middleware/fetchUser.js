import jwt from "jsonwebtoken";

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token');
    // res.json({token: token})
    // console.log("token ",token)

    if(!token) {
        // res.status(401).json({error: "Please authenticate using a valid token"})
    }

    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        req.user = data.user;
        // console.log(data.user)
        // console.log("user verified at fetchUser")
        next()
    } catch (error) {
        // console.log("user verification failed at fetchUser")
        res.status(401).json({error: "Please authenticate using a valid token"})
    }
}

export default fetchUser;