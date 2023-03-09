import { getAuthors, updateAuthor, deleteAuthor, addAuthor, GetAuthorColumns, getAuthorIDList } from '../models/authorsModel.mjs';

export const cGetAuthorsList = async (req, res, next) => {
    let data = await getAuthorIDList();
    res.send(data)
};


export const cGetAuthors = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getAuthors();
    res.send(data)
};

export const cGetAuthorColumns = async (req, res) => {
    let authorColumns = await GetAuthorColumns();
    res.send(authorColumns)
}

export const cAddAuthor = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log(req.body.email)
        result = await addAuthor(req.body['Author Full Name'], req.body['Author Username'], req.body.email, req.body.admin_id, req.body.admin_action);
        if (result.authorsCreated === 0) {
            console.log("Controllers / Add Author / Line 29")
            res.status(400).send(result.status);
        } else {
            console.log("Controllers / Add Author / Line 33")
            res.status(200).send(result.status);
        }
    } catch (error) {
        console.log("Enter catch error piece of Controller/Add Author method")
        res.send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }
}

export const cUpdateAuthor = async (req, res, next) => {
    let result = await updateAuthor(req.params.id, req.body['Author Full Name'], req.body['Author Username'], req.body.email, req.body.admin_id, req.body.admin_action);
    res.send(result);
}

export const cDeleteAuthor = async (req, res, next) => {
    let result = await deleteAuthor(req.params.id);
    res.json(result);
}