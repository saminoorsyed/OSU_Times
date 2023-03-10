import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getIDList() {
    const [result] = await pool.query(
        `Select user_author_id, Users2.full_name as 'user_id', Authors2.full_name as 'author_id'
        from Users_Authors2
        left join Users2 on Users_Authors2.user_id = Users2.user_id
        left join Authors2 on Users_Authors2.author_id = Authors2.author_id;
        `);
    return result;
}


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
    // const [result] = await pool.query(`
    //                     SELECT * 
    //                     FROM INFORMATION_SCHEMA.COLUMNS
    //                     WHERE TABLE_NAME = N'Users_Authors2';`)
    // return result.map(({COLUMN_NAME}) => COLUMN_NAME);
    let result = ["user_author_id", "user_id", "author_id"]
    return result;

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

    console.log(`Model UserAuthor Add Method -- Beginning`);

    try {
        console.log(`Model UserAuthor Add Method -- Try statement`);

        result_set_header = await pool.query(`
        insert into Users_Authors2 (user_id, author_id)
                values(?, ?)`, [user_id, author_id],
        )
    } catch (error) {
        console.log(`Model UserAuthor Add Method -- Catch statement`);

        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numAdded: 0, status: "not unique user author" };
        } else {
            return { numAdded: 0, status: "Error occured when trying to create author" };
        }
    }

    numberRecordsAdded = result_set_header[0].affectedRows;
    console.log(`Model UserAuthor Add Method -- Leaving Method`);
    return { numAdded: numberRecordsAdded, status: "user author added" };
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
    console.log(`Model UserAuthor Update Method -- Beginning`);

    try {
        console.log(`Model UserAuthor Update Method -- try statement`);
        console.log(`user_id: ${user_id}   author_id ${author_id}   user_author_Id: ${user_author_id}`);

        let result_set_header = await pool.query(`
            update Users_Authors2
            set user_id = ?, author_id = ?
            where user_author_id = ?`,
            [user_id, author_id, user_author_id],
        )
        console.log("After sql query");
        console.log(result_set_header);
        console.log(result_set_header[0].affectedRows)
        numberRecordsUpdated = result_set_header[0].affectedRows;
        // console.log(`NumUpdated: ${numUpdated}   what is it? should be 0`)

        if (numberRecordsUpdated === 1) {
            console.log(`Model UserAuthor Update Method -- numRecordsUpdated == 1`);

            return { numUpdated: numberRecordsUpdated, status: "updated user author" };
        } else {
            console.log(`Model UserAuthor Update Method -- numRecordsUpdated != 1`);

            console.log(`NumUpdated: ${numUpdated}   ==== should be 0`)
            return { numUpdated: numberRecordsUpdated, status: "failed to update user author" };
        }
    } catch (error) {
        console.log(`Model UserAuthor Update Method -- catch error statement`);

        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUpdated: 0, status: "Unique Constraint issue" };
        }
        return { numUpdated: 0, status: "Issue occured while trying to update." }; 
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

