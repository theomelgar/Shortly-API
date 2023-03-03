import { Router } from "express"
import { signUp } from "../controllers/Users.controllers"
import { validateSchema } from "../middlewares/validateSchemas.middleware"
import { signUpSchema, loginSchema } from "../schemas/auth.schema"

const loginRouter = Router()

loginRouter.post("/signup", validateSchema(signUpSchema), signUp)
loginRouter.post("/signin", validateSchema(loginSchema), signIn)

export default loginRouter