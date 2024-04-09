import bcryptjs from "bcryptjs"
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const {fullName, username, email, password} = req.body;
        if(!fullName || !username || !email || !password){
            return res.status(401).json({
                message: "Enter all details",
                success: false
            })
        }

        const user = await User.findOne({$or: [{username}, {email}]})
        if(user){
            return res.status(401).json({
                message: "User already exists. Either login or create new account",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16)

        const newUser = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        const jwtData = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
        console.log(jwtData)

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            user: {
                id: newUser._id,
                fullName,
                email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (error) {
        console.log("Error in user registration: ", error);
        return res.status(500).json({
            message: "An error occurred while registering user",
            success: false
        })
    }
}

export const Logiin = async (req, res) => {
    try {
        const {username , password} = req.body;
        if (!username || !password) {
            return res.status(401).json({
                message: "Enter all details",
                success: false
            })
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({
                message: "Enter valid credentials",
                success: false
            })
        }

        const passwordCompare = await bcryptjs.compare(password, user.password)
        if(!passwordCompare) {
            return res.status(401).json({
                message: "Enter valid credentials",
                success: false
            })
        }

        const payload = {
            user: {
                id:user.id
            }
        }

        const authToken = jwt.sign(payload, process.env.JWT_SECRET)
        res.json(authToken)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
}