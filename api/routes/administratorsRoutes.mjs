import express from 'express';
import { cGetAdministrators, cAddAdministrator, cGetAdministratorColumns, cUpdateAdministrator, cDeleteAdministrator, cGetAdministratorsListWithNull, cGetAdministratorsList } from '../Controllers/AdministratorsControllers.mjs';


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

router.route('/namelist')
     .get(cGetAdministratorsList)

router.route('/namelistwithnull')
     .get(cGetAdministratorsListWithNull)

export { router as adminsRoute };
