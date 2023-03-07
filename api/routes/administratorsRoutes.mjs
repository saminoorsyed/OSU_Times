import express from 'express';
import { cGetAdministrators, cAddAdministrator, cGetAdministratorColumns, cUpdateAdministrator, cDeleteAdministrator, cGetAdministratorsList } from '../Controllers/AdministratorsControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetAdministrators)
     .post(cAddAdministrator)

router.route('/columns')
     .get(cGetAdministratorColumns)

router.route("/:id")
     .put(cUpdateAdministrator)
     .delete(cDeleteAdministrator)


router.route('/namelistwithnull')
     .get(cGetAdministratorsList)

export { router as adminsRoute };
