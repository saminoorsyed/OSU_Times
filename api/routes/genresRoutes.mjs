import express from 'express';
import { cAddGenre, cDeleteGenre, cUpdateGenre, cGetGenres, cGetGenreColumns, cGetGenresList } from '../Controllers/GenresControllers.mjs';


const router = express.Router();

// these routes return json
router.route("/",)
     .get(cGetGenres)
     .post(cAddGenre)

router.route('/columns')
     .get(cGetGenreColumns)

router.route("/:id")
     .put(cUpdateGenre)
     .delete(cDeleteGenre)

router.route('/nameslist')
     .get(cGetGenresList)

export { router as genresRoutes };
