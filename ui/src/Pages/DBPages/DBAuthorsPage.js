import React from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";

function DBAuthorsPage(){
    let dbAuthors = [                
        {
            "author_id":0,
            "username":"TheDoctor",
            "fname":"The",
            "lname":"Doctor",
            "email":"TheDoctor@Hologram.com",
            "admin_id":"Lead Botanist",
            "admin_action":"1) on 11.3.4060 Supreme Commander expressed concern on post content 2)Warned and put on probation on 11.4.4060"
        },
        {
            "author_id": 1,
            "username":"Borg",
            "fname": "Seven",
            "lname": "ofNine",
            "email": "sevenofnine@borg.com",
            "admin_id":"Chief Engineer",
            "admin_action": "1)Promote her work to front page (Supreme commander expressed approval)"
        },
        {
            "author_id":2,
            "username":"Lieutenant",
            "fname": "Tom",
            "lname": "Paris",
            "email":"tparis@starfleet.com",
            "admin_id": "Chief Engineer",
            "admin_action":"Null"
        }
    ]
    let dbColumns = ["author_id", "username", "fname", "lname", "email", "admin_id", "admin_action"];
    let dbIdObjects = {
        "admin_id": [["Moral Officer",0], ["Chief Engineer",1], ["Lead Botanist",2], ["Null", null]]
    } 
    const [columns, setColumns] = useState(dbColumns);
    const [authors, setAuthors] = useState(dbAuthors);
    const [IdObjects, setIdObjects] = useState(dbIdObjects)

    const [query, setQuery] = useState('');
    const results = filterItems(authors, query);

    function filterItems(items, query){
        return items.filter(item => item.username.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }



    return(
    <section>
        <h2>Welcome to the Authors table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"username"}
        />
        <DBTable
            objects = {results}
            columns = {columns}
            IdObjects = {IdObjects}
            />
    </section>
    );
};

export default DBAuthorsPage;