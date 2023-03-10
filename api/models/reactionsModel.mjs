import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getReactionNameList() {
    const [result] = await pool.query(
        `Select Reactions2.reaction_id, Reaction_Icons2.reaction_type 
        from Reactions2 left join Reaction_Icons2 on Reactions2.reaction_icon_id = Reaction_Icons2.reaction_icon_id
        `,);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getReactions() {
    const [result] = await pool.query(`
    Select Reactions2.reaction_id, Users2.full_name as 'user_id', Posts2.title as 'post_id', Reaction_Icons2.reaction_type as 'reaction_icon_id', Reactions2.date_reacted
    from Reactions2 
    left join Users2 on Reactions2.user_id = Users2.user_id
    left join Posts2 on Reactions2.post_id = Posts2.post_id
    left join Reaction_Icons2 on Reactions2.reaction_icon_id = Reaction_Icons2.reaction_icon_id;
    
    `);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetReactionColumns(){
    let result = ["reaction_id", "user_id", "post_id", "reaction_icon_id", "date_reacted"];
    return result;
    // const [result] = await pool.query(
    //     `SELECT * 
    //     FROM INFORMATION_SCHEMA.COLUMNS
    //     WHERE TABLE_NAME = N'Reactions2';`)
    // return result.map(({COLUMN_NAME}) => COLUMN_NAME);
}

// inputs:  (int/str, string, string, string, string)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateReaction(reaction_id, user_id, post_id, reaction_icon_id) {
    let numberRecordsUpdated = 0
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;

    let result_set_header;
    try {
        result_set_header = await pool.query(`
            update Reactions2
            set user_id = ?, post_id = ?, reaction_icon_id = ?
            where reaction_id = ?`,
            [user_id, post_id, reaction_icon_id, reaction_id],
        )
    } catch (error) {
        console.log("Model/Reactions entered catch for sql update Reaction")
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUpdated: 0, status: "null reaction id# issue" };
        }
        console.log(error)
        console.log("Model/Reactions catch right befor error return for sql update Reaction")

        return { numUpdated: 0, status: "Invalid inputs" }
    }

    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUpdated: numberRecordsUpdated, status: "updated reaction" };
    } else {
        return { numUpdated: numberRecordsUpdated, status: "failed to update reaction" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteReaction(reaction_id) {
    let numberRecordsUpdated = 0
    let result_set_header = await pool.query(`
        delete from Reactions2
        where reaction_id = ?`,
        [reaction_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete reaction" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted reaction" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addReaction(user_id, post_id, reaction_icon_id) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberResultsAdded;
    let result_set_header;

    try {
        result_set_header = await pool.query(`
        insert into Reactions2 (user_id, post_id, reaction_icon_id)
                values(?, ?, ?)`, [user_id, post_id, reaction_icon_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numAdded: 0, status: "not unique reaction" };
        }
        return error
    }

    numberResultsAdded = result_set_header[0].affectedRows;
    return { numAdded: numberResultsAdded, status: "reaction added" };
}
