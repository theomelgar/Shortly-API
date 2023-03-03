import { Router } from "express"
import { deleteUrl, getUrlById, postShort, redirect } from "../controllers/URL.controllers.js";
import { validateSchema } from "../middlewares/validateSchemas.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";
import auth from "../middlewares/auth.middleware.js";

const urlRouter = Router()

urlRouter.post('/urls/shorten', auth, validateSchema(urlSchema), postShort)
urlRouter.get('/urls/:id', getUrlById);
urlRouter.get('/urls/open/:shortUrl', redirect);
urlRouter.delete('/urls/:id', auth, deleteUrl);

export default urlRouter