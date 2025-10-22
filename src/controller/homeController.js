import { Router } from "express";
import blogServices from "../services/blogServices.js";

export const homeController = Router();

homeController.get('/', async (req, res) => { 
    const query = await blogServices.getAll();
    let blogs = [];

    for (let i = query.length - 2; i < query.length; i++) {
        blogs.push(query[i]);
    }

    res.render('home', { 
        blogs, 
        pageTitle: 'Home Page', 
    });
});