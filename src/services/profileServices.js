import { Blog } from "../models/Blog.js"

export default {
    getAllBlog() {
        return Blog.find().select({
            title: true,
            category: true, 
            owner: true, 
            followList: true
        });
    }
}