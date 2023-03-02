import React from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";

function DBCommentsPage(){
    let dbComments = [                
        {
            "comment_id":0,
            "post_id":"An Anthropology of space faring",
            "user_id":"Lead Botanist",
            "date_commented":"3540-25-28 15:44:52.123",
            "comment_text":"Great article Doctor</p>",
        },
        {
            "comment_id":1,
            "post_id":"The varied uses of flux capacitors",
            "user_id":"Moral Officer",
            "date_commented":"3540-25-28 15:44:52.123",
            "comment_text":"Novel insight into the collective",
        },
        {
            "comment_id": 2,
            "post_id": "The varied uses of flux capacitors",
            "user_id": "Moral Officer",
            "date_commented": "3540-25-28 15:44:52.123",
            "comment_text": "I hate the Borg!!!",
        }
    ]
    let dbColumns = ["comment_id", "post_id", "user_id", "date_commented", "comment_text"];
    let dbIdObjects = {
        "user_id": [["Moral Officer",0],[ "Chief Engineer",1], ["Lead Botanist",2]],
        "post_id": [["Ethics of the Collective",0],["An Anthropology of space faring",1], ["The varied uses of flux capacitors",2]]
    } 
    const [columns, setColumns] = useState(dbColumns);
    const [comments, setComments] = useState(dbComments);
    const [IdObjects, setIdObjects] = useState(dbIdObjects)

    const [query, setQuery] = useState('');
    const results = filterItems(comments, query);

    function filterItems(items, query){
        return items.filter(item => item.user_id.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }


    return(
    <section>
        <h2>Welcome to the Comments table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"user"}
        />
        <DBTable
            objects = {results}
            columns = {columns}
            IdObjects = {IdObjects}/>
    </section>
    );
};

export default DBCommentsPage;