import express from 'express';
import { cAddComment, cDeleteComment, cUpdateComment, cGetComments, cGetCommentColumns, cGetCommentsList } from '../Controllers/CommentsControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetComments)
     .post(cAddComment)

router.route('/columns')
     .get(cGetCommentColumns)

     router.route("/:id")
     .put(cUpdateComment)
     .delete(cDeleteComment)

router.route('/titlelist')
     .get(cGetCommentsList)

export { router as commentsRoutes };
