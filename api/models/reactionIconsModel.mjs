import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getReactionIconsNames() {
    return getReactionIcons();
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getReactionIcons() {
    const [result] = await pool.query(`
    Select reaction_icon_id, reaction_type
    from Reaction_Icons2`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetReactionIconsColumns(){
    const [result] = await pool.query(
        `SELECT * 
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = N'Reaction_Icons2';`)
    return result;
}

// inputs:  (int/str, string, string, string, string)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateReactionIcon(reaction_icon_id, reaction_type) {
    let numberRecordsUpdated = 0
    let result_set_header;
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    const CODE_NULL_ERROR = 1048;
    try {
        result_set_header = await pool.query(`
            update Reaction_Icons2
            set reaction_type = ?
            where reaction_icon_id = ?`,
            [reaction_type, reaction_icon_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersUpdated: 0, status: "null reaction icon id# issue" };
        }
        return error
    }

    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUsersUpdated: numberRecordsUpdated, status: "updated reaction icon" };
    } else {
        return { numUsersUpdated: numberRecordsUpdated, status: "failed to update reaction icon" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteReactionIcon(reaction_icon_id) {
    let numberRecordsUpdated = 0
    let result_set_header = await pool.query(`
        delete from Reaction_Icons2
        where reaction_icon_id = ?`,
        [reaction_icon_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete reaction icon" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted reaction icon" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addReactionIcon(reaction_type) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    const CODE_NULL_ERROR = 1048;

    let numberUserAdded;
    let result_set_header;

    try {
        console.log(`Reaction Type: ${reaction_type}  `)
        result_set_header = await pool.query(`
        insert into Reaction_Icons2 (reaction_type)
                values(?)`, [reaction_type],
        )

    } catch (error) {
        console.log("Enter catch piece of Mode/Reaction Icon/Add ")
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersAdded: 0, status: "not unique reaction type" };
        } else if (error.errno === CODE_NULL_ERROR) {
            return { numUsersAdded: 0, status: "null input value" };
        }
        return error
    }

    numberUserAdded = result_set_header[0].affectedRows;
    return { numUsersAdded: numberUserAdded, status: "reaction type added" };
}