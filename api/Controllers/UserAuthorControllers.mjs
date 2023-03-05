import { getUsersAuthors, updateUsersAuthor, deleteUsersAuthors, addUsersAuthors, GetUsersAuthorsColumns, getUsersAuthorsIDList } from '../models/usersAuthorsModel.mjs';

export const cGetUsersAuthorsList = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getUserAuthorsIDList();
    res.send(data)
};


export const cGetUsersAuthors = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getUsersAuthors();
    res.send(data)
};

export const cGetUsersAuthorsColumns =  async (req, res)=>{
    let authorColumns = await GetUsersAuthorsColumns();
    res.send(userColumns)
}

export const cAddUsersAuthors = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of post method")
        result = await addUsersAuthors(req.body.user_id, req.body.author_id);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }
    console.log("Enter send final result piece of post method")
    res.send(result);
}

export const cUpdateUsersAuthors = async (req, res, next) => {
    let result = await updateUsersAuthors(req.params.id, req.body.user_id, req.body.author_id);
    res.send(result);
}

export const cDeleteUsersAuthors = async (req, res, next) => {
    let result = await deleteUsersAuthors(req.params.id);
    res.json(result);
}