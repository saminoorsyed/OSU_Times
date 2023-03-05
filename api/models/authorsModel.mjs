import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getAuthorIDList() {
    const [result] = await pool.query(
        `Select author_id, full_name from Authors2`);
    return result;
}


// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getAuthors() {
    const [result] = await pool.query(
        `Select author_id, Authors2.full_name as 'Author Full Name', Authors2.username as 'Author Username', Authors2.email, admin_action, Authors2.admin_id, Administrators2.full_name
        from Authors2
        left join Administrators2 on Authors2.admin_id = Administrators2.admin_id`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetAuthorColumns(){
    const [result] = await pool.query(`
                        SELECT * 
                        FROM INFORMATION_SCHEMA.COLUMNS
                        WHERE TABLE_NAME = N'Authors2';`)
    return result.map(({COLUMN_NAME}) => COLUMN_NAME);                    
}

// inputs:  (int/str, string, string, string, string)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateAuthor(author_id, username, full_name, email, admin_id, admin_action) {
    let numberRecordsUpdated = 0
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let result_set_header;
    try {
        result_set_header = await pool.query(`
            update Authors2
            set username = ?, full_name = ?, email = ?, admin_id = ?, admin_action = ?
            where author_id = ?`,
            [username, full_name, email, admin_id, admin_action, author_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersUpdated: 0, status: "null authorid# issue" };
        }
        return error
    }

    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUsersUpdated: numberRecordsUpdated, status: "updated author" };
    } else {
        return { numUsersUpdated: numberRecordsUpdated, status: "failed to update author" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteAuthor(author_id) {
    let numberRecordsUpdated = 0
    let result_set_header = await pool.query(`
        delete from Authors2
        where author_id = ?`,
        [author_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete author" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted author" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addAuthor(username, full_name, email, admin_id, admin_action) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberRecordsAdded;
    let result_set_header;

    try {
        result_set_header = await pool.query(`
        insert into Authors2(username, full_name, email, admin_id, admin_action)
                values(?, ?, ?, ?, ?)`, [username, full_name, email, admin_id, admin_action],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersAdded: 0, status: "not unique author" };
        }
        return error
    }

    numberRecordsAdded = result_set_header[0].affectedRows;
    return { authorsCreated: numberRecordsAdded, status: "author added" };
}