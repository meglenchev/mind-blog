import { Router } from "express";
import blogServices from "../services/blogServices.js";

export const homeController = Router();

homeController.get('/', async (req, res) => { 
    const blogs = await blogServices.getLatest();
    
    res.render('home', { 
        blogs, 
        pageTitle: 'Home Page', 
    });
});