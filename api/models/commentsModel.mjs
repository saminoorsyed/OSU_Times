import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getCommentIDList() {
    const [result] = await pool.query(
        `Select comment_id, comment_text
        From Comments`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getComments() {
    const [result] = await pool.query(`
    Select Comments.comment_id, Posts.title as 'post_id',
    Users.full_name as 'user_id', comment_text, date_commented
    from Comments
    left join Posts on Comments.post_id = Posts.post_id
    left join Users on Comments.user_id = Users.user_id;`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function getCommentColumns() {
    //     const [result] = await pool.query(`
    //                 SELECT * 
    //                 FROM INFORMATION_SCHEMA.COLUMNS 
    //                 WHERE TABLE_NAME = N'Comments2';`)
    //     return result.map(({COLUMN_NAME}) => COLUMN_NAME);

    let result = ["comment_id", "post_id", "user_id", "comment_text", "date_commented"]
    return result;
}

// inputs:  (int/str, string, string, string, string)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updateComment(comment_id, post_id, user_id, comment_text, date_commented) {
    let numberRecordsUpdated = 0
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let result_set_header;
    try {
        result_set_header = await pool.query(`
            update Comments
            set post_id = ?, user_id = ?, comment_text = ?, date_commented = ?
            where comment_id = ?`,
            [post_id, user_id, comment_text, comment_id, date_commented],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUpdated: 0, status: "null comment id# issue" };
        }
        return error
    }


    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUpdated: numberRecordsUpdated, status: "updated comment" };
    } else {
        return { numUpdated: numberRecordsUpdated, status: "failed to update comment" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deleteComment(comment_id) {
    let numberRecordsUpdated = 0
    let result_set_header = await pool.query(`
        delete from Comments
        where comment_id = ?`,
        [comment_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete comment" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted comment" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addComment(post_id, user_id, comment_text, date_commented) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberUserAdded;
    let result_set_header;

    try {
        result_set_header = await pool.query(`
                insert into Comments(post_id, user_id, comment_text, date_commented)
                values(?, ?, ?, ?)`, [post_id, user_id, comment_text, date_commented],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUsersAdded: 0, status: "not unique comment" };
        }
        return error
    }

    numberUserAdded = result_set_header[0].affectedRows;
    return { numUsersAdded: numberUserAdded, status: "comment added" };
}
