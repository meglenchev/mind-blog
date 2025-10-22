import blogServices from "../services/blogServices.js";

export async function isBlogOwner(req, res, next) {
    const blogId = req.params.blogId;

    const blog = await blogServices.getOne(blogId)

    if (!blog.owner.equals(req.user.id)) {
        return res.status(401).render('404', { error: 'Only owner can edit this blog!' })
    }

    req.blog = blog;

    next();
}