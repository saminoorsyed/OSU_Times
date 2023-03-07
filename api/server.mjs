import express from 'express';
import dotenv from 'dotenv';
import { usersRoute } from './routes/usersRoutes.mjs';
import {reactionIconRouter} from  './routes/reactionIconsRoutes.mjs'
import {adminsRoute} from './routes/administratorsRoutes.mjs'
import { genresRoutes } from './routes/genresRoutes.mjs';
import {reactionRoutes} from './routes/reactionRoutes.mjs' 
import { postRoute } from './routes/postsRoutes.mjs';
import cors from 'cors';
import fs from 'fs';
import { authorsRoute } from './routes/authorsRoutes.mjs';
import { userAuthorsRoutes } from './routes/usersAuthorsRoutes.mjs';


dotenv.config();

const app = express();

app.use(cors());
export const corsOptions = {
    origin: "http://localhost:3001"
};

app.use(express.static('public')); // for testing
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
   
app.use("/api/users", usersRoute);
app.use("/api/administrators", adminsRoute);
app.use("/api/genres", genresRoutes);
app.use("/api/reactionicons", reactionIconRouter);
app.use("/api/reactions", reactionRoutes);
app.use("/api/posts", postRoute);
app.use("/api/authors", authorsRoute)

app.use("/api/usersauthors", userAuthorsRoutes);

app.listen(process.env.API_PORT, () => {
    console.log(`Express server is listening on port ${process.env.API_PORT}!`);
})


// can't find route
app.use((req, res, next) => {
    res.status(404).send(`Unable to find route.  METHOD: ${req.method} | URL: ${req.url}!`);
})

// parse error like extra comma,etc
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send("Server 500 issue!")
})