import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


// https://www.youtube.com/watch?v=Hej48pi_lOc&t=331s
// mysql2 allows async instead of callback stuff

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

}).promise()

export { pool }