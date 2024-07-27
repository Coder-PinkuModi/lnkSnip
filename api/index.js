import { configDotenv } from "dotenv";
configDotenv();

import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import mongoDBconnect from "../connect.js"
import routerLink from "../routes/route.js"
import { checkAuth } from "../middleware/authenticate.js";
import {homepage, signinPage, signupPage} from "../routes/staticrouter.js"
import { fileURLToPath } from 'url';

const port=process.env.PORT || 3000
const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

app.set("view engine","ejs")
app.set('views', path.join(__dirname, '../public'));


mongoDBconnect(process.env.MONGODB_URI)


app.get("/", checkAuth, homepage)

app.get("/signup",signupPage)

app.get("/login",signinPage)

app.get('/logout', (req, res) => {
    // Clear the JWT token from cookies
    res.clearCookie('jwt');
    
    // Redirect to home or login page
    res.redirect('/');
});

app.use(`/api`,routerLink)

app.listen(port,()=>console.log("Server started at port 8000"))