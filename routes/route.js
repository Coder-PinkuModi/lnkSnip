import express from "express"
import { createId, redirectWeb } from "../controllers/control.js"
import { checkAuth, restrictToLoggedinUserOnly } from "../middleware/authenticate.js";
import { createUser,loginRoute } from "../controllers/userModelRoutes.js"
import { emailVerificationValidator } from "../controllers/verificationTokenValidator.js"

const router= express.Router();

router.post("/createId",  createId);
router.get("/:shortid",redirectWeb)
router.post("/signup",createUser)
router.post("/login",loginRoute)
router.get("/verifyEmail/:token",emailVerificationValidator)

export default router;