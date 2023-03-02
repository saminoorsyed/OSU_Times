import React from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";

function DBAdminsPage(){
    let dbAdmins = [                
        {
            "admin_id":0,
            "username":"Moral Officer",
            "fname":"Mister",
            "lname":"Neelix",
            "email":"mneelix@talax.com@voyager.com",
        },
        {
            "admin_id": 1,
            "username":"Chief Engineer",
            "fname": "Belana",
            "lname": "Torres",
            "email": "btorres@makis.com",
        },
        {
            "admin_id":2,
            "username":"Lead Botanist",
            "fname": "Kes",
            "lname": "Ocampa",
            "email":"kocampa@telepath.com",
        }
    ]
    let dbColumns = ["admin_id", "username", "fname", "lname", "email"];
    let dbIdObjects = {}
    const [columns, setColumns] = useState(dbColumns);
    const [admins, setAdmins] = useState(dbAdmins);
    const [IdObjects, setIdObjects] = useState(dbIdObjects)

    const [query, setQuery] = useState('');
    const results = filterItems(admins, query);

    function filterItems(items, query){
        return items.filter(item => item.username.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }



    return(
    <section>
        <h2>Welcome to the Admins table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"username"}
        />
        <DBTable
            objects = {results}
            columns = {columns}
            IdObjects = {IdObjects}/>
    </section>
    );
};

export default DBAdminsPage;