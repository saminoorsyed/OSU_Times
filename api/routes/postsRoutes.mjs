import express from 'express';
import { cAddPost, cDeletePost, cUpdatePost, cGetPosts, cGetPostColumns, cGetPostsIDList } from '../Controllers/PostsControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetPosts)
     .post(cAddPost)

router.route('/columns')
     .get(cGetPostColumns)

     router.route("/:id")
     .put(cUpdatePost)
     .delete(cDeletePost)

router.route('/list')
     .get(cGetPostsIDList)

export { router as postRoute };
