import express from "express"
import HomeController from "../controllers/homeController.js"
import isAuthenticated from "../middlewares/authMiddleware.js"
const router = express.Router()

router.get("/", [isAuthenticated, HomeController.home])

export default router