import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getGenreNameList() {
    const [result] = await pool.query(
        `Select genre_id, genre_name from Genres2`);
        return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getGenres() {
    const [result] = await pool.query(`
    Select genre_id, genre_name
    from Genres2`);
    
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetGenreColumns(){
    const [result] = await pool.query(
        `SELECT * 
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = N'Genres2';`)
    return result.map(({COLUMN_NAME}) => COLUMN_NAME);
}

// inputs:  (int/str, string, string, string, string)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateGenre(genre_id, genre_name) {
    let numberRecordsUpdated = 0
    let result_set_header;
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    const CODE_NULL_ERROR = 1048;
    try {
        result_set_header = await pool.query(`
            update Genres2
            set genre_name = ?
            where genre_id = ?`,
            [genre_name, genre_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUpdated: 0, status: "null genre id# issue" };
        } else if(error.errno === CODE_NULL_ERROR) {
            return { numUpdated: 0, status: "null admin id# issue" };
        }
        return error
    }

    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUpdated: numberRecordsUpdated, status: "updated genre" };
    } else {
        return { numUpdated: numberRecordsUpdated, status: "failed to update genre" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteGenre(genre_id) {
    let numberRecordsUpdated = 0

    let num_delete_post = await pool.query(`
        delete from Posts2
        where genre_id = ?`,
        [genre_id],
    )

    let result_set_header = await pool.query(`
        delete from Genres2
        where genre_id = ?`,
        [genre_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete genre" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted genre" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addGenre(genre_name) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberRecordsAdded;
    let result_set_header;

    try {
        result_set_header = await pool.query(`
        insert into Genres2 (genre_name)
                values(?)`, [genre_name],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersAdded: 0, status: "not unique genre" };
        }
        return error
    }

    numberRecordsAdded = result_set_header[0].affectedRows;
    return { numAdded: numberRecordsAdded, status: "genre added" };
}