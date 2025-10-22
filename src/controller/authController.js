import { Router } from "express";
import authServices from "../services/authServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

export const authController = Router();

authController.get('/login', isGuest,  (req, res) => {
    res.render('login', { pageTitle: 'Login Page' });
});

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authServices.login(email, password);

        res.cookie('auth', token);

        res.redirect('/')

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(404).render('login', {
            error: errorMessage, 
            email, 
            pageTitle: 'Login Page',
        })
    }
});

authController.get('/register', isGuest, (req, res) => {
    res.render('register', { pageTitle: 'Register Page' });
});

authController.post('/register', isGuest, async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        const token = await authServices.register(username, email, password, rePassword);

        res.cookie('auth', token);

        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('register', { 
            error: errorMessage, 
            email, 
            username, 
            pageTitle: 'Register Page',
        });
    }
});

authController.get('/logout', isAuth, (req, res) => {
    // Clear Auth Cookie
    res.clearCookie('auth');

    // TODO: Invalidate JWT Token
    res.redirect('/');
});