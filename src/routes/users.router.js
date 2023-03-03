import { Router } from "express"
import { signUp, signIn, getUserById, ranking } from "../controllers/Users.controllers.js"
import { validateSchema } from "../middlewares/validateSchemas.middleware.js"
import { signUpSchema, loginSchema } from "../schemas/auth.schema.js"
import { signInMW, signUpMW } from "../middlewares/users.middleware.js"
import auth from "../middlewares/auth.middleware.js"

const usersRouter = Router()

usersRouter.post("/signup", validateSchema(signUpSchema), signUpMW, signUp)
usersRouter.post("/signin", validateSchema(loginSchema), signInMW, signIn)
usersRouter.get('/users/me', auth, getUserById);
usersRouter.get('/ranking', ranking);

export default usersRouter

