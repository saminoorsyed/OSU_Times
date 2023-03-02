import React from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";

function DBUsersAuthorsPage(){
    let dbUsersAuthors = [                
        {
            "user_author_id":0,
            "user_id": "Moral Officer",
            "author_id":"Borg",
        },
        {
            "user_author_id": 1,
            "user_id":"Moral Officer",
            "author_id": "TheDoctor",
        },
        {
            "user_author_id":2,
            "user_id":"Chief Engineer",
            "author_id": "Borg",
        }
    ]
    let dbColumns = ["user_author_id", "user_id", "author_id"];
    let dbIdObjects = {
        "user_id": [["Moral Officer",0],[ "Chief Engineer",1], ["Lead Botanist",2]],
        "author_id": [["TheDoctor",0], ["Borg",1], ["Lieutenant",2]]
    }
    const [columns, setColumns] = useState(dbColumns);
    const [usersAuthors, setUsersAuthors] = useState(dbUsersAuthors);
    const [IdObjects, setIdObjects] = useState(dbIdObjects);

    const [query, setQuery] = useState('');
    const results = filterItems(usersAuthors, query);

    function filterItems(items, query){
        return items.filter(item => item.user_id.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }


    return(
    <section>
        <h2>Welcome to the Users Authors table page</h2>
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

export default DBUsersAuthorsPage;