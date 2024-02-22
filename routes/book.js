import express from "express"
import BookController from "../controllers/bookController.js"
import isAuthenticated from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", [isAuthenticated, BookController.create])
router.post("/", [isAuthenticated, BookController.create])
router.get("/buy/:id", [isAuthenticated, BookController.buy])
router.get("/verify-esewa/:id", [isAuthenticated, BookController.verifyEsewa])

export default router