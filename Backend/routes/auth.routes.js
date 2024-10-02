import express, { Router } from "express"
import { login, logout, Signup } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/Signup", Signup)
router.post("/logout", logout)
router.post("/login", login)

export default router