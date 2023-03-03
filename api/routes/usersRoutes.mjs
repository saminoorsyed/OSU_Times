import express from 'express';
import { cAddUser, cDeleteUser, cUpdateUser, cGetUsers, cGetUserColumns } from '../Controllers/UserControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetUsers)
     .post(cAddUser)

router.route('/columns')
     .get(cGetUserColumns)

     router.route("/:id")
     .put(cUpdateUser)
     .delete(cDeleteUser)


export { router as usersRoute };
