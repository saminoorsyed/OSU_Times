import { pool } from './dbConnector.mjs';

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getPostsList() {
    const [result] = await pool.query(
        `Select post_id, title from Posts2`);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)

export async function getPosts() {
    const [result] = await pool.query(`
    Select post_id, Posts2.author_id, Authors2.full_name, Posts2.genre_id, Genres2.genre_name, title, date_posted, post_text
    from Posts2 
      left join Authors2 on Posts2.author_id = Authors2.author_id
        inner join Genres2 on Posts2.genre_id = Genres2.genre_id;
    
    `);
    return result;
}

// no inputs accepted
// returns promise
// interior data is json (array of user objects)
export async function GetPostsColumns(){
    const [result] = await pool.query(`
                SELECT * 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = N'Posts2';`)
    return result.map(({COLUMN_NAME}) => COLUMN_NAME);
}

// inputs:  (int/str, string, string, string, string)
// output:  promise
//          interior data is json
//          {numUsersUpdated: 1, status: updated user}
//          {numUsersUpdated: 0, status: failed to update user}

export async function updatePost(post_id, author_id, genre_id, title, post_text) {
    let numberRecordsUpdated = 0
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let result_set_header;
    console.log(` ${author_id}, ${genre_id}, ${title}, ${post_text}, ${post_id} `)
    try {
        result_set_header = await pool.query(`
            update Posts2
            set author_id = ?,  genre_id = ?, title = ?, post_text = ?
            where post_id = ?`,
            [author_id, genre_id, title, post_text, post_id],
        )
    } catch (error) {
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numUpdated: 0, status: "null post id# issue" };
        }
        return error
    }

    console.log("The num recorded updated step")
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 1) {
        return { numUpdated: numberRecordsUpdated, status: "updated post" };
    } else {
        return { numUpdated: numberRecordsUpdated, status: "failed to update post" };
    }
}

// input str/int
// returns promise
// interior data is json 
//       {numberDeleted: 0, status: "failed to delete user"}
//       {numberDeleted: 1, status: "deleted user"}

export async function deletePost(post_id) {
    let numberRecordsUpdated = 0
    let result_set_header = await pool.query(`
        delete from Posts2
        where post_id = ?`,
        [post_id],
    )
    numberRecordsUpdated = result_set_header[0].affectedRows;
    if (numberRecordsUpdated === 0) {
        return { numberDeleted: numberRecordsUpdated, status: "failed to delete post" };
    } else {
        return { numberDeleted: numberRecordsUpdated, status: "deleted post" };
    }


}


// input: int or # as string allowed: 
// returns promise 
// interior data is json   
//    {numUsersAdded: 1, status: user added}
//    {numUsersAdded: 0, status: not unique user}
// otherwise throws error

export async function addPost(author_id, genre_id, title, post_text) {
    const CODE_UNIQUE_CONSTRAINT_FAILED = 1062;
    let numberPostsAdded;
    let result_set_header;

    console.log("Entering Model / Create Post")
    try {
        result_set_header = await pool.query(`
        insert into Posts2(author_id, genre_id, title, post_text)
                values(?, ?, ?, ?)`, [author_id, genre_id, title, post_text],
        )
    } catch (error) {
        console.log(` ${author_id}, ${genre_id}, ${title}, ${post_text}  `)
        if (error.errno === CODE_UNIQUE_CONSTRAINT_FAILED) {
            return { numberPostsAdded: 0, status: "not unique post" };
        }
        return error
    }

    numberPostsAdded = result_set_header[0].affectedRows;
    return { numAdded: numberPostsAdded, status: "post added" };
}