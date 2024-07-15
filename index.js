import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import mongoDBconnect from "./connect.js"
import routerLink from "./routes/route.js"
import { checkAuth } from "./middleware/authenticate.js";
import {homepage, signinPage, signupPage} from "./routes/staticrouter.js"
import { fileURLToPath } from 'url';
const port=8000
const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/public')));

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'));


mongoDBconnect("mongodb://127.0.0.1:27017/urlShortner")


app.get("/",checkAuth,homepage)

app.get("/login",signinPage)

app.get("/signup",signupPage)

app.use("/urlshort",routerLink)

app.listen(port,()=>console.log("Server started at port 8000"))
