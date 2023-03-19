import { getUsers, updateUser, deleteUser, addUser, GetUserColumns, getUsersIDList } from '../models/usersModel.mjs';

export const cGetUsersIDList = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getUsersIDList();
    res.send(data)
};


export const cGetUsers = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getUsers();
    res.status(200).send(data)
};

export const cGetUserColumns =  async (req, res)=>{
    let userColumns = await GetUserColumns();
    res.status(200).send(userColumns)
}

export const cAddUser = async (req, res, next) => {
    
    let result;
    try {
        console.log("Enter try piece of post method")
        result = await addUser(req.body.username, req.body.full_name,req.body.email);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.status(500).send({ status: "Issue occured when trying to add user. ", error })
    }

    console.log("Enter send final result piece of post method")

    if(result.numberChanged === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result.status);

    }
}

export const cUpdateUser = async (req, res, next) => {
    let result;
    try {
        result = await updateUser(req.params.id, req.body.username, req.body.full_name, req.body.email);
    } catch(error){
        res.status(500).send("500 - Server Error");
    }
    
    if (result.numUsersUpdated === 0){
        res.status(400).send("User not updated.");
    } else {
        console.log(result);
        console.log("User created")
        res.status(200).send(result.status);
    }
    
}

export const cDeleteUser = async (req, res, next) => {
    let result = await deleteUser(req.params.id);
    if(result.numberDeleted === 0){
        res.status(400).send("Unable to find user that you want to delete");
    } else {
        console.log(result);
        res.status(200).send(result.status);
    }
    
}
