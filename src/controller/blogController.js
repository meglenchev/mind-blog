import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import blogServices from "../services/blogServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isBlogOwner } from "../middlewares/blogMiddleware.js";

export const blogController = Router();

blogController.get('/', async (req, res) => {
    const blogs = await blogServices.getAll();

    res.render('catalog', {
        blogs,
        pageTitle: 'Catalog Page',
    });
});

blogController.get('/:blogId/details', async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const blog = await blogServices.getOne(blogId).populate('followList owner');

        const isOwner = blog.owner && blog.owner._id.equals(req.user?.id);

        const isLoged = req.user && !isOwner;

        const followed = blog.followList.filter(user => user.equals(req.user?.id));

        let isFollowed = false;

        if (followed.length) {
            isFollowed = true;
        }

        res.render('details', {
            blog,
            isOwner,
            isLoged,
            isFollowed,
            pageTitle: 'Details Page'
        });

    } catch (err) {
        res.render('404', { error: 'Something went wrong!' })
    }
});

blogController.get('/:blogId/edit', isAuth, isBlogOwner, async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const blog = await blogServices.getOne(blogId);

        res.render('edit', {
            blog,
            pageTitle: 'Edit Page'
        })
    } catch (err) {
        res.render('404', { error: 'Blog not found!' })
    }
});

blogController.post('/:blogId/edit', isAuth, async (req, res) => {
    const blogId = req.params.blogId;
    const blogData = req.body;

    try {
        await blogServices.update(blogId, blogData);

        res.redirect(`/blogs/${blogId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('edit', {
            error: errorMessage,
            blog: blogData,
        });
    }
});

blogController.get('/create', isAuth, (req, res) => {
    res.render('create', { pageTitle: 'Create Page' });
});

blogController.post('/create', isAuth, async (req, res) => {
    const blogData = req.body;
    const ownerId = req.user.id; // We get the ID from the middleware "isAuth"

    try {
        const blog = await blogServices.create(blogData, ownerId);

        res.redirect('/blogs');
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('create', {
            error: errorMessage,
            blog: blogData,
            pageTitle: 'Create Page'
        });
    }
});

blogController.get('/:blogId/delete', isAuth, isBlogOwner, async (req, res) => {
    const blogId = req.params.blogId;

    const blog = await blogServices.getOne(blogId);

    // if (!movie.creator?.equals(req.user.id)) {
    //     return res.redirect('/');
    // }

    await blogServices.delete(blogId);

    res.redirect('/blogs');
});

blogController.get('/:blogId/fllow', isAuth, async (req, res) => {
    const blogId = req.params.blogId;

    const userId = req.user.id;

    await blogServices.fllow(blogId, userId);

    res.redirect(`/blogs/${blogId}/details`);
});