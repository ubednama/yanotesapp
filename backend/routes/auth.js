import express from 'express'
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import { Login, Register } from '../controllers/user.js';
import fetchUser from '../middleware/fetchUser.js';
const router = express.Router();


let success = false;
// Create user using POST
router.post("/signup",[
            body('fullName', 'Give your Full name').isLength({min: 3}),
            body('username', 'Username must contain min 8 characters').isLength({min: 8}),
            body('email', 'Please enter valid email').isEmail(),
            body('password', 'Password must contain minimum 8 characters').isLength({min: 8})
            // .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            // .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            // .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            // .matches(/[0-9]/).withMessage('Password must contain at least one number')
            // .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
        ],(req, res, next)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array() })
            }
            next()
        }, Register)

// Logiin
router.post('/login', [
        body("username", "Enter valid username"),
        body("password", "Enter valid password")
    ], (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        next()
    }, Login)


//get user details
router.post('/getUser', fetchUser, async (req, res) =>{
    try {
        const {id} = req.user.id;
        const user = await User.findOne({id}).select("-password")
        console.log("router",user)
        success = true
        res.send({success, user})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success, error: "Internal Server Error"});
    }
})

export default router;