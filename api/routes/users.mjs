import express from 'express';
import { getUsers, updateUser, deleteUser, addUser } from '../model.mjs';

const router = express.Router();

// these routes return json
router.route("/", )
     .get(async (req, res, next) => {
          // console.log("Enter get method!!!")
          let data = await getUsers();
          res.send(data);
     })
     .post(async (req, res, next) => {
          let numCreated = 0;  
          let result;  
          // console.log("Enter post method")   
          try {
               console.log("Enter try piece of post method")
               result = await addUser(req.body.username, req.body.fname, req.body.lname, req.body.email);
          } catch (error){
               console.log("Enter catch error piece of post method")
               res.send({status: "unknown error that wasn't handled"})
               // res.send("Unable to create user. Check fields for uniqueness")
          }
          console.log("Enter send final result piece of post method")
          res.send(result);
     })

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


export {router as userRoute};
