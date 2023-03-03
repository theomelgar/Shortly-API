import { Router } from "express"
import { getUrlById, postShort } from "../controllers/URL.controllers.js";
import { validateSchema } from "../middlewares/validateSchemas.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";
import auth from "../middlewares/auth.middleware.js";

const urlRouter = Router()

urlRouter.post('/urls/shorten', auth, validateSchema(urlSchema), postShort)
urlRouter.get('/urls/:id', getUrlById);
urlRouter.get('/urls/open/:shortUrl');
urlRouter.delete('/urls/:id');

export default urlRouter