import express, { application } from 'express';
import { cAddUser, cDeleteUser, cUpdateUser, cGetUsers, cGetUserColumns, cGetUsersIDList } from '../Controllers/UsersControllers.mjs';


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

// user_id, full_name
router.route('/namelist')
     .get(cGetUsersIDList)


export { router as usersRoute };
