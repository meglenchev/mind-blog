import { Schema, Types, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String, 
        required: [true, 'Title is required!'],
        minLength: [5, 'Title shold be at least 5 characters long!'], 
        maxLength: [50, 'Title must be no longer than 50 characters.!']
    },
    image: {
        type: String, 
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image Url is invalid']
    },
    content: {
        type: String, 
        required: [true, 'Content is required!'],
        minLength: [10, 'Content shold be at least 10 characters long!']
    },
    category: {
        type: String, 
        required: [true, 'Blog Category is required!'],
        minLength: [3, 'Blog Category shold be at least 3 characters long!']
    }, 
    followList: [{
        type: Types.ObjectId, // Set data type
        ref: 'User' // User DB Reference
    }],
    owner: { // Single Relation Property
        type: Types.ObjectId,
        ref: 'User', 
        required: [true, 'Blog should have creator!']
    }
});

export const Blog = model('Blog', blogSchema, 'blogs');