const mongoose = require("mongoose");
const userscheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email : {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile_img: {
            type: String,
        },
        blogs: {
            type: Array,
        },
        bio: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        followers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        },
        following: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("User", userscheme);