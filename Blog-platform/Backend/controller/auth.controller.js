const User = require('../models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}


const register = async (req, res) => {
    try {
        const { name,username, email, password } = req.body;

        if(!name || !username || !email || !password) {
            return res.status(400).json({
                 message: "Name, email, and password are required"
                 });
    }
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long"
        });
    }
const normalizedEmail = email.trim().toLowerCase();  
const normalizedUsername = username.trim().toLowerCase();

const existingUser = await User.findOne({
     $or: [
        { email: normalizedEmail },
         { username: normalizedUsername }
        ] 
    });

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: existingUser.email === normalizedEmail ? "Email already exists" : "Username already exists"
        });
    }
const hashedPassword = await bycrypt.hash(password, 12);

const user = await User.create({
    name : name.trim(),
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
    })
     
    console.log("User created : ", user);
    const token = generateToken(user._id);

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profile_img: user.profile_img,
            bio: user.bio,
        }
    });
}catch (err) {
    console.log("Error in register controller: ", err);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}
}

//login user

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ 
        email: normalizedEmail
    })

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User with this email is not found"
        });
    }
    
    const isPasswordMatch = await bycrypt.compare(password, user.password);

    if(!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid password"
        });
    }
    const token = generateToken(user._id);

    return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profile_img: user.profile_img,
            bio: user.bio,
        }
    });

}catch (err){

    console.log("Error in login controller: ", err);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}

}