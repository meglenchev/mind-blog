import { Blog } from "../models/Blog.js"

export default {
    getAllBlog() {
        return Blog.find().select({
            title: true,
            category: true, 
            owner: true, 
            followList: true
        });
    },
    getAllByOwnerId(ownerId) {
        return Blog.find({owner: ownerId});
    }, 
    getAllByFollower(followerId) {
        return Blog.find().in('followList', followerId);
    }
}