import express from "express"
import { createId, redirectWeb } from "../controllers/control.js"
import { createUser,loginRoute } from "../controllers/userModelRoutes.js"
import { emailVerificationValidator } from "../controllers/verificationTokenValidator.js"

const router= express.Router();

router.post("/createId",  createId);
router.post("/signup",createUser)
router.post("/login",loginRoute)
router.get("/verifyEmail/:token",emailVerificationValidator)

export default router;