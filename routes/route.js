import express from "express"
import { createId, redirectWeb } from "../controllers/control.js"
import { checkAuth, restrictToLoggedinUserOnly } from "../middleware/authenticate.js";
import {createUser,loginRoute} from "../controllers/userModelRoutes.js"
const router= express.Router();

router.post("/",  createId);
router.get("/redirect/:shortid",redirectWeb)
router.post("/signup",createUser)
router.post("/login",loginRoute)

export default router;