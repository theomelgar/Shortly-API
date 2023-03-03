import { Router } from "express"
import { signUp, signIn } from "../controllers/Users.controllers.js"
import { validateSchema } from "../middlewares/validateSchemas.middleware.js"
import { signUpSchema, loginSchema } from "../schemas/auth.schema.js"

const usersRouter = Router()

usersRouter.post("/signup", validateSchema(signUpSchema), signUp)
usersRouter.post("/signin", validateSchema(loginSchema), signIn)
usersRouter.get('/users/me');
usersRouter.get('/ranking');

export default usersRouter

