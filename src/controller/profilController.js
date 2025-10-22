import { Router } from "express";
import profileServices from "../services/profileServices.js";

export const profilController = Router();

profilController.get('/', async (req, res) => {
    const email = req.user.email;
    const userId = req.user.id;

    try {
        const blogs = await profileServices.getAllBlog();

        const userBlogs = blogs.filter(blog => blog.owner.equals(userId));

        const followBlogs = blogs.filter(blog => blog.followList.includes(userId));

        res.render('profile', {
            email,
            userBlogs,
            totalBlogs: userBlogs.length,
            followBlogs,
            totalFollowBlogs: followBlogs.length,
            pageTitle: 'Catalog Page'
        })

    } catch (err) {
        res.render('404', { error: 'Something went wrong!' })
    }
});