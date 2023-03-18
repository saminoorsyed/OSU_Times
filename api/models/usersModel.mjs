import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getUsersIDList() {
    const [result] = await pool.query(`Select user_id, full_name from Users`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getUsers() {
    const [result] = await pool.query(`
    Select user_id, full_name, username, email
    from Users`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetUserColumns() {
    const [result] = await pool.query(
        `SELECT * 
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = N'Users';`)
    console.log(result)
    return result.map(({ COLUMN_NAME }) => COLUMN_NAME);
}

// inputs:  (int/str, string, string, string, string)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateUser(user_id, username, full_name, email) {
    console.log("Enter update user (model) function")
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let result_set_header;
    if (email === null || username === null) {
        return { numUsersUpdated: 0, status: "null input issue" };
    }
    try {
        result_set_header = await pool.query(`
            update Users
            set username = ?, full_name = ?, email = ?
            where user_id = ?`,
            [username, full_name, email, user_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersUpdated: 0, status: "null user id# issue" };
        }
        console.log("(Model/User - Upcoming error")
        return error
    }

    let numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUsersUpdated: numberRecordsUpdated, status: "updated user" };
    } else {
        return { numUsersUpdated: numberRecordsUpdated, status: "failed to update user" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteUser(user_id) {

    let numberRecordsUpdated = 0
    let result_set_header = await pool.query(`
        delete from Users
        where user_id = ?`,
        [user_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete user" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted user" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addUser(username, full_name, email) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    const CODE_NULL_ERROR = 1048;
    let result_set_header;

    try {
        result_set_header = await pool.query(`
        insert into Users (username, full_name, email)
                values(?, ?, ?)`, [username, full_name, email],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { status: "not unique user" };
        } else if (error.errno === CODE_NULL_ERROR) {
            return { status: "null input error" }
        }
        return error
    }

    return { status: "user added" };
}
