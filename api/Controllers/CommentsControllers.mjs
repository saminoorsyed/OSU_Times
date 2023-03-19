import { getComments, updateComment, deleteComment, addComment, getCommentColumns, getCommentIDList } from '../models/commentsModel.mjs';

export const cGetCommentsList = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getCommentIDList();
    res.send(data)
};


export const cGetComments = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getComments();
    res.send(data)
};

export const cGetCommentColumns =  async (req, res)=>{
    let userColumns = await getCommentColumns();
    res.send(userColumns)
}

export const cAddComment = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of post method")
        result = await addComment(req.body.post_id, req.body.user_id, req.body.comment_text, req.body.date_commented);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }

    if(result.numUsersAdded === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result.status);
    }
    console.log("Enter send final result piece of post method")
}

export const cUpdateComment = async (req, res, next) => {
    let result = await updateComment(req.params.id, req.body.post_id, req.body.user_id, req.body.comment_text, req.body.date_commented);

    if(result.numUpdated === 0){
        res.status(400).send(result.status)
    } else {
        res.status(200).send(result.status);
    }
}

export const cDeleteComment = async (req, res, next) => {
    let result = await deleteComment(req.params.id);
    if(result.numberDeleted === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result.status);
    }
}
