const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        slugs: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        content: {
            type: String,
            required: true,
        },
        coverimage: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdZt9uDY4WI62Y45Bm-ePa9y9hkYbpTmZA_TQTSvIvsIttYweBaAeP8s&s=10'
    },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        category: {
            type: String,
            default: 'General',
        },
        tags: {
            type: [String],
            enum: ["draft", "published"],
            default: ["draft"],
        },
        published: {
            type: Date,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
            min: 0,
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Blog", blogSchema);