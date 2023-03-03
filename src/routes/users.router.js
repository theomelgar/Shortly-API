import { Router } from "express"
import { signUp, signIn } from "../controllers/Users.controllers.js"
import { validateSchema } from "../middlewares/validateSchemas.middleware.js"
import { signUpSchema, loginSchema } from "../schemas/auth.schema.js"

const loginRouter = Router()

loginRouter.post("/signup", validateSchema(signUpSchema), signUp)
loginRouter.post("/signin", validateSchema(loginSchema), signIn)

export default loginRouter

