import express from 'express';
import dotenv from 'dotenv';
import { usersRoute } from './routes/usersRoutes.mjs';
import cors from 'cors';
import fs from 'fs';

dotenv.config();

const app = express();

app.use(cors());
export const corsOptions = {
    origin: "http://localhost:3001"
};

// app.post('/users/', cors(corsOptions), async (req, res) => {
//     res.json({status: "Who Cares?"});
// });
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");    // give access to any client
//     res.header("Access-Control-Allow-Headers", 
//     "Origin", "X-Requested-With", "Content-Type", 
//     "Accept", "Authorization");
//     if(req.method === 'OPTIONS'){
//         res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

// app.use(cors()); // prevent cors issue despite less safe?
// app.use(cors());
// app.options("*", cors()); // added
app.use(express.static('public')); // for testing
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    let content = "";

    if (req.method === 'GET') {
        content = req.method + " , " + req.url + "\n";
    }
    else if (req.method === 'DELETE') {
        content = req.method + ", " + req.url + "\n";
    } else if (req.method === 'PUT') {
        content = req.method + ", " + req.url + ", " + req.body.username + ", " + req.body.fname + ", " + req.body.lname + ", " + req.body.email + "\n";
    } else if (req.method === "POST") {
        content = req.method + ", " + req.url + ", " + req.body.username + ", " + req.body.fname + ", " + req.body.lname + ", " + req.body.email + "\n";
    } else {
        content = req.method + " | " + req.url + " Unknown stuff " + "\n";
    }

    fs.appendFile('file.txt', content, err => {
        if (err) {
            throw err
        }
        console.log('File is updated.')
    })
    next()
})

app.use("/users", usersRoute);

app.listen(process.env.API_PORT, () => {
    console.log(`Express server is listening on port ${process.env.API_PORT}!`);
})


// can't find route
app.use((req, res, next) => {
    res.status(404).send(`Unable to find route.  METHOD: ${req.method} | URL: ${req.url}!`);
})