import express from 'express';
import { addOneUser, getAllUsers } from '../Controllers/UserControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(getAllUsers)
     .post(addOneUser)

router.route("/:id")

     // put
     .put(async (req, res, next) => {
          let result = await updateUser(req.params.id, req.body.username, req.body.fname, req.body.lname, req.body.email);
          res.send(result);
     })
     // delete
     .delete(async (req, res, next) => {
          let result = await deleteUser(req.params.id);
          res.json(result);
     })


export { router as usersRoute };
