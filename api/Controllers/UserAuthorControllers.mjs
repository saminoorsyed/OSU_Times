import { getUsersAuthors, updateUsersAuthors, deleteUsersAuthors, addUsersAuthors, GetUsersAuthorsColumns } from '../models/usersAuthorsModel.mjs';


export const cGetUsersAuthors = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getUsersAuthors();
    res.send(data)
};

export const cGetUsersAuthorsColumns =  async (req, res)=>{
    let usersAuthorsColumns = await GetUsersAuthorsColumns();
    res.send(usersAuthorsColumns)
}

export const cAddUsersAuthors = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of post method")
        result = await addUsersAuthors(req.body.user_id, req.body.author_id);

        if(result.numAdded === 0){
            res.status(400).send(result.status);
        } else {
            res.status(200).send(result.status);
        }
    } catch (error) {
        console.log("Enter catch error piece of post method");
        res.send("unknown error that wasn't handled");
    }
}

export const cUpdateUsersAuthors = async (req, res, next) => {
    try{
        
        let result = await updateUsersAuthors(req.params.id, req.body.user_id, req.body.author_id);
        console.log(`Controller Update UserAuthors: ${result}`)
        console.log(result);
        if(result.numUpdated === 0){
            res.status(400).send(result.status);
        } else {
            res.send(result.status);
        }
    } catch(error){
        res.status(400).send("Error occured when trying to update 'Users Authors'")
    }
}

export const cDeleteUsersAuthors = async (req, res, next) => {
    try {
        let result = await deleteUsersAuthors(req.params.id);
        if(result.numberDeleted === 0){
            res.status(400).send(result.status);
        } else {
            res.json(result.status);
        }
    }  catch(error){
        res.status(400).send("Error occured when trying to delete 'Users Authors'")
    }
   
}
