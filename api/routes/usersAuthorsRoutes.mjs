import express from 'express';
import { cAddUsersAuthors, cDeleteUsersAuthors, cUpdateUsersAuthors, cGetUsersAuthors, cGetUsersAuthorsColumns, cGetUsersAuthorsList } from '../Controllers/UsersAuthorsControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetUsersAuthors)
     .post(cAddUsersAuthors)

router.route('/columns')
     .get(cGetUsersAuthorsColumns)

     router.route("/:id")
     .put(cUpdateUsersAuthors)
     .delete(cDeleteUsersAuthors)

router.route('/followinglist')
     .get(cGetUsersAuthorsList)

export { router as usersRoute };
