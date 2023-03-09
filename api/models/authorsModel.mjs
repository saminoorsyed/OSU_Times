import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getAuthorIDList() {
    const [result] = await pool.query(
        `Select author_id, full_name from Authors2`);
    let result_with_null = result;
    result_with_null.push({ author_id: null, full_name: null })
    return result_with_null;
}


// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getAuthors() {
    const [result] = await pool.query(
        `Select author_id, Authors2.full_name as 'Author Full Name', Authors2.username as 'Author Username', Authors2.email, admin_action, Administrators2.full_name as 'admin_id'
        from Authors2
        left join Administrators2 on Authors2.admin_id = Administrators2.admin_id;`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetAuthorColumns() {
    const result = ['author_id', 'Author Full Name', 'Author Username', 'email', 'admin_action', 'admin_id']
    console.log(result)
    return result;
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
        console.log(`username: ${username} , full_name: ${full_name}, email: ${email}, admin_id: ${admin_id} , admin_action ${admin_action}`)
        result_set_header = await pool.query(`
            update Authors2
            set username = ?, full_name = ?, email = ?, admin_id = ?, admin_action = ?
            where author_id = ?`,
            [username, full_name, email, admin_id, admin_action, author_id],
        )
        numberRecordsUpdated = result_set_header[0].affectedRows;
        if (numberRecordsUpdated === 1) {
            return { numUsersUpdated: numberRecordsUpdated, status: "updated author" };
        } else {
            return { numUsersUpdated: numberRecordsUpdated, status: "failed to update author" };
        }

    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersUpdated: 0, status: "Unique input issue" };
        }
        return { numUsersUpdated: 0, status: "Input issue" };
    }


}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteAuthor(author_id) {
    let numberRecordsUpdated = 0

    let queryStr = `delete from Users_Authors2 where author_id = ${author_id};`;
    console.log("Query String to delete User Author Dependencies for an Author");
    console.log(queryStr);

    const delete_author = await pool.query(queryStr)

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

export async function addAuthor(full_name, username, email, admin_id, admin_action) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberRecordsAdded;
    console.log(`username: ${username} , full_name: ${full_name}, email: ${email}, ${admin_id} ,  ${admin_action}   `)
    try {
        console.log("Enter try piece of Model / Add Author")

        let insert_statement = "insert into Authors2 ";
        let column_names = "(full_name, username, email, admin_action, admin_id) "
        let value_placeholders = "values (?,?, ?, ?, ?)"
        let queryStr = insert_statement + column_names + value_placeholders;
        console.log(queryStr);

        let result_set_header = await pool.query(queryStr, [full_name, username, email, admin_id, admin_action])

        console.log("about to calculate # records added")
        numberRecordsAdded = result_set_header[0].affectedRows;
        return { authorsCreated: numberRecordsAdded, status: "author added" };
    } catch (error) {
        console.log("Model / Line 117")
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { authorsCreated: 0, status: "not unique author" };
        }
        return { authorsCreated: 0, status: "Invalid input author" };
    }


}