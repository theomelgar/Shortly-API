import { Router } from "express"
import { postShort } from "../controllers/URL.controllers.js";
import { validateSchema } from "../middlewares/validateSchemas.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";

const urlRouter = Router()

urlRouter.post('/urls/shorten', validateSchema(urlSchema), postShort)
urlRouter.get('/urls/:id');
urlRouter.get('/urls/open/:shortUrl');
urlRouter.delete('/urls/:id');

export default urlRouter