const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
     const jwt = require("jsonwebtoken")
//@desc Register a user
//@route POST /api/users/register
//@access public

const createUser = asyncHandler(
    async (req, res) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400);
            return res.json({ error: "All fields are required" }); // Return the response to stop further processing
        }

        const userAvailable = await User.findOne({ email })
        if (userAvailable) {
            res.status(400);
            return res.json({ error: "User Already Exists" }); // Return the response here to avoid further processing
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);
   
        const user = await User.create({
            username,
            email,
            password: hashPassword,
        })

        console.log(`user created ${user}`)
        if (user) {
            return res.status(201).json({ _id: user.id, email: user.email }); // Return the response after creation
        } else {
            res.status(400);
            return res.json({ error: "User data is not valid" }); // Return the response here too
        }

    }
)


//@desc Login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(
    async (req, res) => {

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error(" All Fileds are mandatory")
        }
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
            )
            res.status(200).json({ accessToken })
        }else{
            res.status(401)
            throw new Error("Invalid Credentials")
        }
    }
)


//@desc Current user info
//@route GET /api/users/login
//@access private

const currentUser = asyncHandler(
    async (req, res) => {
        res.json(req.user)
    }
)

module.exports = { createUser, loginUser, currentUser }