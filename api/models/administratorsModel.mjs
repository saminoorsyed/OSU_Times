import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getAdministratorsIDList() {
    let [result] = await pool.query(
        `Select admin_id, full_name from Administrators2`);
    console.log(result);
    console.log(result.length)
    result.splice(result.length, 0, {admin_id: null, full_name: null});
    return result;
}


// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getAdministrators() {
    const [result] = await pool.query(
        `Select admin_id, full_name, username, email
        from Administrators2`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function getAdministratorsColumns(){
    const [result] = await pool.query(`
                        SELECT * 
                        FROM INFORMATION_SCHEMA.COLUMNS
                        WHERE TABLE_NAME = N'Administrators2';`)
    return result.map(({COLUMN_NAME}) => COLUMN_NAME);                    
}

// inputs:  (int/str, string, string, string, string)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateAdministrator(admin_id, full_name, username, email) {
    let numberRecordsUpdated = 0
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    const CODE_NULL_ERROR = 1048;
    let result_set_header;
    console.log("Model/Admin update start function")
    try {
        result_set_header = await pool.query(`
            update Administrators2
            set full_name = ?, username = ?, email = ?
            where admin_id = ?`,
            [full_name, username, email, admin_id],
        )
    } catch (error) {
        console.log("Model/Admin update catch sql")
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUpdated: 0, status: "unique field issue" };
        } else if(error.errno === CODE_NULL_ERROR) {
            return { numUpdated: 0, status: "null admin id# issue" };
        }
        return error
    }

    console.log("Model/Admin update pre numberRecordsUpdated sent")
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUpdated: numberRecordsUpdated, status: "updated administrator" };
    } else {
        return { numUpdated: numberRecordsUpdated, status: "failed to update administrator" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteAdministrator(admin_id) {
    let numberRecordsUpdated = 0
    let result_set_header = await pool.query(`
        delete from Administrators2
        where admin_id = ?`,
        [admin_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete administrator" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted administrator" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addAdministrator(full_name, username, email) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberRecordsAdded;
    let result_set_header;

    try {
        result_set_header = await pool.query(`
        insert into Administrators2(full_name, username, email)
                values(?, ?, ?)`, [full_name, username, email],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersAdded: 0, status: "not unique administrator" };
        }
        return error
    }

    numberRecordsAdded = result_set_header[0].affectedRows;
    return { authorsCreated: numberRecordsAdded, status: "administrator added" };
}