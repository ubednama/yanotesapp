import jwt from "jsonwebtoken";

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token');
    // res.send({token: token})

    if(!token) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        req.user = data.user;
        // console.log(data.user)
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}

export default fetchUser;