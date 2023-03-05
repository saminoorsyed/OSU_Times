import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getUsersAuthors() {
    const [result] = await pool.query(
        `Select user_author_id, Users_Authors2.user_id, Users2.full_name as 'User FullName', Users_Authors2.author_id, Authors2.full_name as 'Author FullName'
        from Users_Authors2
        left join Users2 on Users_Authors2.user_id = Users2.user_id
        left join Authors2 on Users_Authors2.author_id = Authors2.author_id;
        `);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetUsersAuthorsColumns(){
    const [result] = await pool.query(`
                        SELECT * 
                        FROM INFORMATION_SCHEMA.COLUMNS
                        WHERE TABLE_NAME = N'Users_Authors2';`)
    return result.map(({COLUMN_NAME}) => COLUMN_NAME);

}

// inputs:  (int/str, int/str, int/str)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateUsersAuthors(user_author_id, user_id, author_id) {
    let numberRecordsUpdated = 0
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let result_set_header;
    try {
        result_set_header = await pool.query(`
            update Users_Authors2
            set user_id = ?, author_id = ?
            where user_author_id = ?`,
            [user_id, author_id, user_author_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUpdated: 0, status: "null user author id# issue" };
        }
        return error
    }

    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUpdated: numberRecordsUpdated, status: "updated user author" };
    } else {
        return { numUpdated: numberRecordsUpdated, status: "failed to update user author" };
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
        delete from Users_Authors2
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

export async function addUsersAuthors(user_id, author_id) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberRecordsAdded;
    let result_set_header;

    try {
        result_set_header = await pool.query(`
        insert into Users_Authors2 (user_id, author_id)
                values(?, ?)`, [user_id, author_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numAdded: 0, status: "not unique user author" };
        }
        return error
    }

    numberRecordsAdded = result_set_header[0].affectedRows;
    return { numAdded: numberRecordsAdded, status: "user author added" };
}
