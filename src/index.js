import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

import { routes } from "./routes.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

const url = 'mongodb://localhost:27017';

try {
    await mongoose.connect(url, {
        dbName: 'mind-blog',
    })

    console.log('Successfully conntected to MDB');
    
} catch (err) {
    console.log(`Cannot connect to DB ${err.message}`);
}

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true, // Config Handlebars to work with mongoose documents
        allowProtoPropertiesByDefault: true // Config Handlebars to work with mongoose documents
    }
}));


app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Setup Static Middleware - Specify the location of static files for the project
app.use(express.static('src/public'));

// Add Cookie-parser
app.use(cookieParser());

// Middleware that will Parse Form Data from request "Body Parser"
app.use(express.urlencoded({ extended: false }));

// Middleware JSON Parser
app.use(express.json());

// Use Auth Middleware
app.use(authMiddleware);

// Routs
app.use(routes); // Calling The Global Routs controller

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))