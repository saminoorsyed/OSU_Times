import { getReactionIcons, updateReactionIcon, deleteReactionIcon, addReactionIcon, GetReactionIconsColumns, getReactionIconsNames } from '../models/reactionIconsModel.mjs';

export const cGetReactionIconsNames = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getReactionIconsNames();
    res.send(data)
};


export const cGetReactionIcons = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getReactionIcons();
    res.send(data)
};

export const cGetReactionIconsColumns =  async (req, res)=>{
    let reactionIconColumns = await GetReactionIconsColumns();
    let columnNames = reactionIconColumns.map(({COLUMN_NAME}) => COLUMN_NAME)
    res.send(columnNames)
}

export const cAddReactionIcon = async (req, res, next) => {
    console.log("Entering controller Add ReactionIcon method")
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of reaction method")
        result = await addReactionIcon(req.body.reaction_type);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.status.send(400).send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }
    console.log("Enter send final result piece of post method")
    if(result.numUsersAdded === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result);
    }
    
}

export const cUpdateReactionIcon = async (req, res, next) => {
    let result = await updateReactionIcon(req.params.id, req.body.reaction_type);
    if(result.numUsersUpdated === 0){
        res.status(400).send(result);
    } else {
        res.status(200).send(result);
    }
}


export const cDeleteReactionIcon = async (req, res, next) => {
    let result = await deleteReactionIcon(req.params.id);
    if(result.numberDeleted === 0){
        res.status(400).send("Invalid reaction so can't delete")
    } else {
        res.status(200).json(result);
    }
    
}