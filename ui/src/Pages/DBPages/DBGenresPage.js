import React from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";

function DBGenresPage(){
    let dbGenres = [                
        {
            "genre_id":0,
            "genre_name":"Anthropology",
        },
        {
            "genre_id": 1,
            "genre_name":"Music",
        },
        {
            "genre_id":2,
            "genre_name":"Blaspheme",
        }
    ]
    let dbColumns = ["genre_id", "genre_name"];
    let IdObjects = {} 

    const [columns, setColumns] = useState(dbColumns);
    const [genres, setGenres] = useState(dbGenres);

    const [query, setQuery] = useState('');
    const results = filterItems(genres, query);

    function filterItems(items, query){
        return items.filter(item => item.genre_name.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }



    return(
    <section>
        <h2>Welcome to the Genres table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"genre_name"}
        />
        <DBTable
            objects = {results}
            columns = {columns}
            IdObjects = {IdObjects}/>
    </section>
    );
};

export default DBGenresPage;