import express from 'express';
import { cAddAuthor, cDeleteAuthor, cUpdateAuthor, cGetAuthors, cGetAuthorColumns, cGetAuthorsList } from '../Controllers/AuthorControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetAuthors)
     .post(cAddAuthor)

router.route('/columns')
     .get(cGetAuthorColumns)

     router.route("/:id")
     .put(cUpdateAuthor)
     .delete(cDeleteAuthor)

router.route('/nameslist')
     .get(cGetAuthorsList)

export { router as authorsRoute };
