import { getReactions, updateReaction, deleteReaction, addReaction, GetReactionColumns, getReactionNameList } from '../models/reactionsModel.mjs';

export const cGetReactionNameList = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getReactionNameList();
    res.send(data)
};


export const cGetReactions = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getReactions();
    res.send(data)
};

export const cGetReactionsColumns =  async (req, res)=>{
    let reactionColumns = await GetReactionColumns();
    res.send(reactionColumns)
}

export const cAddReaction = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of post method")
        result = await addReaction(req.body.user_id, req.body.post_id, req.body.reaction_icon_id);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }
    console.log("Enter send final result piece of post method")

    if(result.numAdded === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result);

    }
}

export const cUpdateReaction = async (req, res, next) => {
    let result = await updateReaction(req.params.id, req.body.user_id, req.body.post_id, req.body.reaction_icon_id);

    if (result.numUpdated === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result.status);
    }
    
}

export const cDeleteReaction = async (req, res, next) => {
    let result = await deleteReaction(req.params.id);
    res.json(result);
}