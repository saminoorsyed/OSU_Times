import { getGenres, updateGenre, deleteGenre, addGenre, GetGenreColumns, getGenreNameList } from '../models/genresModel.mjs';

export const cGetGenresList = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getGenreNameList();
    res.send(data)
};


export const cGetGenres = async (req, res, next) => {
    // console.log("Enter get method!!!")
    let data = await getGenres();
    res.status(200).send(data)
};

export const cGetGenreColumns =  async (req, res)=>{
    let genreColumns = await GetGenreColumns();
    res.send(genreColumns)
}

export const cAddGenre = async (req, res, next) => {
    let numCreated = 0;
    let result;
    // console.log("Enter post method")   
    try {
        console.log("Enter try piece of post method")
        result = await addGenre(req.body.genre_name);
    } catch (error) {
        console.log("Enter catch error piece of post method")
        res.send({ status: "unknown error that wasn't handled" })
        // res.send("Unable to create user. Check fields for uniqueness")
    }
    console.log("Enter send final result piece of post method")
    res.send(result);
}

export const cUpdateGenre = async (req, res, next) => {
    let result = await updateGenre(req.params.id, req.body.genre_name);
    if(result.numUpdated === 0){
        res.status(400).send(result.status);
    } else {
        res.status(200).send(result.status);
    }
    
}

export const cDeleteGenre = async (req, res, next) => {

    let result = await deleteGenre(req.params.id);
    res.json(result);
}