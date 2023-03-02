import React from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";

function DBReactionsPage(){
    let dbReactions = [                
        {
            "reaction_id":0,
            "post_id":"An Anthropology of space faring",
            "user_id":"Lead Botanist",
            "reaction_icon_id":"heart",
            "date_commented":"3540-25-28 15:44:52.123",
        },
        {
            "reaction_id":1,
            "post_id":"The varied uses of flux capacitors",
            "user_id":"Chief Engineer",
            "reaction_icon_id":"sad face",
            "date_commented":"3540-25-28 15:44:52.123",
        },
        {
            "reaction_id": 2,
            "post_id": "The varied uses of flux capacitors",
            "user_id": "Chief Engineer",
            "reaction_icon_id":"sad face",
            "date_commented": "3540-25-28 15:44:52.123",
        }
    ]
    let dbColumns = ["reaction_id", "post_id", "user_id","reaction_icon_id", "date_commented"];
    let dbIdObjects = {
        "user_id": [["Moral Officer",0],[ "Chief Engineer",1], ["Lead Botanist",2]],
        "post_id": [["Ethics of the Collective",0],["An Anthropology of space faring",1], ["The varied uses of flux capacitors",2]],
        "reaction_icon_id": [["thumbs up",0],["sad face",1],["heart",2]]
    }
    const [columns, setColumns] = useState(dbColumns);
    const [reactions, setReactions] = useState(dbReactions);
    const [IdObjects, setIdObjects] = useState(dbIdObjects);

    const [query, setQuery] = useState('');
    const results = filterItems(reactions, query);

    function filterItems(items, query){
        return items.filter(item => item.reaction_icon_id.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }


    return(
    <section>
        <h2>Welcome to the Reactions Table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"reaction_icon"}
        />
        <DBTable
            objects = {results}
            columns = {columns}
            IdObjects = {IdObjects}/>
    </section>
    );
};

export default DBReactionsPage;