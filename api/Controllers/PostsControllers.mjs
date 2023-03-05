import { getPosts, updatePost, deletePost, addPost, GetPostsColumns, getPostsList } from '../models/postsModel.mjs';

export const cGetPostsIDList = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getPostsList();
    res.send(data)
};


export const cGetPosts = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getPosts();
    res.send(data)
};

export const cGetPostColumns =  async (req, res)=>{
    let userColumns = await GetPostsColumns();
    res.send(userColumns)
}

export const cAddPost = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of post method")
        result = await addPost(req.body.author_id, req.body.genre_id, req.body.title, req.body.post_text);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }
    console.log(result)
    if(req.numPostsAdded === 0){
        res.status(400).send(req.status);
    } else {
        res.status(200).send(result);
    }
    
}

export const cUpdatePost = async (req, res, next) => {
    let result = await updatePost(req.params.id, req.body.author_id, req.body.genre_id, req.body.title, req.body.post_text);
    if (result.numUpdated === 1){
        res.status(200).send(result.status)
    } else {
        res.status(400).send(result.status);
    }
    
}

export const cDeletePost = async (req, res, next) => {
    let result = await deletePost(req.params.id);
    res.json(result);
}