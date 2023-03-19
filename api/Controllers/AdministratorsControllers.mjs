import { getAdministrators, updateAdministrator, deleteAdministrator, addAdministrator, getAdministratorsColumns, getAdministratorsIDListWithNull, getAdministratorsIDList } from '../models/administratorsModel.mjs';

export const cGetAdministratorsListWithNull = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getAdministratorsIDListWithNull();
    res.send(data)
};

export const cGetAdministratorsList = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getAdministratorsIDList();
    res.send(data)
};

export const cGetAdministrators = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getAdministrators();
    res.send(data)
};

export const cGetAdministratorColumns =  async (req, res)=>{
    let administratorsColumns = await getAdministratorsColumns();
    res.send(administratorsColumns)
}

export const cAddAdministrator = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of post method")
        result = await addAdministrator(req.body.full_name, req.body.username, req.body.email);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.status(400).send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }


    if(result.numUsersAdded === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result.status);
    }
    
}

export const cUpdateAdministrator = async (req, res, next) => {
    let result = await updateAdministrator(req.params.id, req.body.full_name, req.body.username, req.body.email);
    console.log(result);
    if(result.numUpdated === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result.status);
    }
    
    
}

export const cDeleteAdministrator = async (req, res, next) => {
    let result = await deleteAdministrator(req.params.id);
    if(result.numberDeleted === 0){
        res.status(404).send("Bad input. No admin deleted")
    } else {
        res.status(200).json(result.status);
    }

    
}