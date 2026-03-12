import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const userExists  = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        //Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        //Create User
        await User.create ({
            name,
            email,
            password: hashPassword
        });

        res.json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({message:"Server error", error});
    }
};

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        //Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        //Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Incorrect password"});
        }
        //Create JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"});
        res.json({
            message: "Login sucessful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({message:"Server error", details: error.message});
    }
}