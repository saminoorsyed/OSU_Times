import React from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";

function DBReactionIconsPage(){
    let dbReactionIcons = [                
        {
            "reaction_icon_id":0,
            "reaction_type":"thumbs up",
            "image_b64_str":"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",
        },
        {
            "reaction_icon_id": 1,
            "reaction_type":"sad face",
            "image_b64_str":"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",
        },
        {
            "reaction_icon_id":2,
            "reaction_type": "heart",
            "image_b64_str":"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",
        }
    ]
    let dbColumns = ["reaction_icon_id", "reaction_type", "image_b64_str"];
    let dbIdObjects = {}

    const [columns, setColumns] = useState(dbColumns);
    const [reactionIcons, setReactionIcons] = useState(dbReactionIcons);
    const [IdObjects, setIdObjects] = useState(dbIdObjects)

    const [query, setQuery] = useState('');
    const results = filterItems(reactionIcons, query);

    function filterItems(items, query){
        return items.filter(item => item.reaction_type.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }


    return(
    <section>
        <h2>Welcome to the Reaction Icons table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"reaction_type"}
        />
        <DBTable
            objects = {results}
            columns = {columns}
            IdObjects = {IdObjects}/>
    </section>
    );
};

export default DBReactionIconsPage;