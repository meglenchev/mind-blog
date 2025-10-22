import { Blog } from "../models/Blog.js"

export default {
    create(blogData, ownerId) {
        return Blog.create({
            ...blogData,
            owner: ownerId,
        });
    },
    getAll() {
        let query = Blog.find().select({
            title: true,
            image: true,
            category: true
        });
        return query;
    }, 
    getLatest() {
        return Blog.find().sort({_id: -1}).limit(3);
    },
    getOne(blogId) {
        return Blog.findById(blogId);
    }, 
    update(blogId, blogData) {
        return Blog.findByIdAndUpdate(blogId, blogData, { runValidators: true });
    }, 
    delete(blogId) {
        return Blog.findByIdAndDelete(blogId);
    }, 
    fllow(blogId, userId) {
        return Blog.findByIdAndUpdate( blogId, { $push: { followList: userId } });
    }
}