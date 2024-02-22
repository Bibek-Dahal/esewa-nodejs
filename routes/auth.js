import express from "express"
import AuthController from "../controllers/authController.js"

const router = express.Router()

router.get("/sign-up", AuthController.signUp)

router.post("/sign-up", AuthController.createUser)

router.get("/login", AuthController.login)
router.post("/login", AuthController.login)

export default router