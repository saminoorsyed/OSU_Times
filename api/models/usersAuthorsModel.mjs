import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getUsersAuthors() {
    const [result] = await pool.query(
        `Select user_author_id, user_id, author_id
        from Users_Authors2`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetUsersAuthorsColumns(){
    const [result] = await pool.query(`
                        SELECT * 
                        FROM INFORMATION_SCHEMA.COLUMNS
                        WHERE TABLE_NAME = N'UsersAuthors2';`)
    return result;
}

// inputs:  (int/str, int/str, int/str)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateUserAuthors(user_author_id, user_id, admin_id) {
    let numberRecordsUpdated = 0
    let result_set_header;
    try {
        result_set_header = await pool.query(`
            update UserAuthors2
            set user_id = ?, admin_id = ?
            where user_author_id = ?`,
            [user_id, admin_id, user_author_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersUpdated: 0, status: "null user author id# issue" };
        }
        return error
    }

    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUsersUpdated: numberRecordsUpdated, status: "updated user author" };
    } else {
        return { numUsersUpdated: numberRecordsUpdated, status: "failed to update user author" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteUsersAuthors(user_author_id) {
    let numberRecordsUpdated = 0
    let result_set_header = await pool.query(`
        delete from UsersAuthors2
        where user_author_id = ?`,
        [user_author_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete user author" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted user author" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addUsersAuthors(user_id, admin_id) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberRecordsAdded;
    let result_set_header;

    try {
        result_set_header = await pool.query(`
        insert into UserAuthors2(user_id, admin_id)
                values(?, ?)`, [user_id, admin_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersAdded: 0, status: "not unique user author" };
        }
        return error
    }

    numberRecordsAdded = result_set_header[0].affectedRows;
    return { authorsCreated: numberRecordsAdded, status: "user author added" };
}