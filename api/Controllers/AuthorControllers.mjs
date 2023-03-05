import { getAuthors, updateAuthor, deleteAuthor, addAuthor, GetAuthorColumns, getAuthorIDList } from '../models/authorsModel.mjs';

export const cGetAuthorsList = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getAuthorIDList();
    res.send(data)
};


export const cGetAuthors = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getAuthors();
    res.send(data)
};

export const cGetAuthorColumns =  async (req, res)=>{
    let authorColumns = await GetAuthorColumns();
    res.send(authorColumns)
}

export const cAddAuthor = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of post method")
        result = await addAuthor(req.body.full_name, req.body.username, req.body.email, req.body.admin_action, req.body.admin_id);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }
    console.log("Enter send final result piece of post method")
    res.send(result);
}

export const cUpdateAuthor = async (req, res, next) => {
    let result = await updateAuthor(req.params.id, req.body.full_name, req.body.username, req.body.email, req.body.admin_action, req.body.admin_id);
    res.send(result);
}

export const cDeleteAuthor = async (req, res, next) => {
    let result = await deleteAuthor(req.params.id);
    res.json(result);
}