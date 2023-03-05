import express from 'express';
import { cAddReaction, cDeleteReaction, cUpdateReaction, cGetReactions, cGetReactionsColumns, cGetReactionNameList } from '../Controllers/ReactionsControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetReactions)
     .post(cAddReaction)

router.route('/columns')
     .get(cGetReactionsColumns)

     router.route("/:id")
     .put(cUpdateReaction)
     .delete(cDeleteReaction)

router.route('/namelist')
     .get(cGetReactionNameList)

export { router as reactionRoutes };
