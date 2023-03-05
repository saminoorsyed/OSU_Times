import express from 'express';
import { cAddReactionIcon, cDeleteReactionIcon, cUpdateReactionIcon, cGetReactionIcons, cGetReactionIconsColumns, cGetReactionIconsNames } from '../Controllers/ReactionIconsControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetReactionIcons)
     .post(cAddReactionIcon)

router.route('/columns')
     .get(cGetReactionIconsColumns)

     router.route("/:id")
     .put(cUpdateReactionIcon)
     .delete(cDeleteReactionIcon)

router.route('/namelist')
     .get(cGetReactionIconsNames)

export { router as reactionIconRouter };
