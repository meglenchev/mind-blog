import { Router } from "express";
import profileServices from "../services/profileServices.js";
import { isAuth } from "../middlewares/authMiddleware.js";

export const profilController = Router();

profilController.get('/', isAuth, async (req, res) => {
    const userId = req.user.id;

    try {
        //const blogs = await profileServices.getAllBlog();
        const userBlogs = await profileServices.getAllByOwnerId(userId);
        const followBlogs = await profileServices.getAllByFollower(userId);

        //const userBlogs = blogs.filter(blog => blog.owner.equals(userId));

        //const followBlogs = blogs.filter(blog => blog.followList.includes(userId));

        res.render('profile', {
            userBlogs,
            totalBlogs: userBlogs.length,
            followBlogs,
            totalFollowBlogs: followBlogs.length,
            pageTitle: 'Profile Page'
        })

    } catch (err) {
        res.render('404', { error: 'Something went wrong!' })
    }
});