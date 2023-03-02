import React from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";

function DBPostsPage(){
    let dbPosts = [                
        {
            "post_id":0,
            "author_id":"Lieutenant",
            "genre_id":"Blaspheme",
            "title":"Ethics of the Collective",
            "date_posted":"3540-01-27 13:24:32.123",
            "post_text":"<p>In the interest of the future of humanity, I hope to shed light on the ethical system which governs the Borg collective and in many cases mirrors the human economic system known as capitalism. To start I'd like cover my own history:</p><p>My link to the Collective has been severed for nearly four years. If I die, everything that I have accomplished in that time, everything I achieved as an individual, will be lost. My memories, my experiences. It will be as if they, as if I never existed.</p>",
            "image_b64_str":"NULL",
        },
        {
            "post_id":1,
            "author_id":"Borg",
            "genre_id":"Music",
            "title":"An Anthropology of space faring cultures",
            "date_posted":"3540-01-27 13:24:32.123",
            "post_text":"<p>My people taught me a man does not own land. He doesn't own anything but the courage and loyalty in his heart. That's where my power comes from. This same thinking can be brought to our exploration and protection of space, whether we have a sense of ownership and stewardship over it. What do we owe the inhabitants of the spaces that we come to occupy with our ever expanding society and how do we use the resources of those spaces responsibly</p>",
            "image_b64_str":"NULL",
        },
        {
            "post_id": 2,
            "author_id": "Borg",
            "genre_id": "Blaspheme",
            "title": "The varied uses of flux capacitors",
            "date_posted": "3540-01-27 13:24:32.123",
            "post_text": "<p>The problem with flux capacitors is that they have too many uses from spacial folding to warp drive coordinate settings and the maintenance of environmental systems, flux capacitors are our friens and foes: too many plane crashes... spacial plane crashes due to excess flux energy.blah blah blah blah blah blah blah blah blah</p>",
            "image_b64_str": "NULL",
        }
    ]
    let dbColumns = ["post_id", "author_id", "genre_id", "title", "date_posted", "post_text", "image_b64_str"];
    let dbIdObjects = {
        "author_id": [["TheDoctor",0], ["Borg",1], ["Lieutenant",2]],
        "genre_id": [["Anthropology",0],["Music",1],["Blaspheme",2]]
    } 
    const [columns, setColumns] = useState(dbColumns);
    const [posts, setPosts] = useState(dbPosts);
    const [IdObjects, setIdObjects] = useState(dbIdObjects)

    const [query, setQuery] = useState('');
    const results = filterItems(posts, query);

    function filterItems(items, query){
        return items.filter(item => item.title.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }



    return(
    <section>
        <h2>Welcome to the Posts table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"title"}
        />
        <DBTable
            objects = {results}
            columns = {columns}
            IdObjects = {IdObjects}/>
    </section>
    );
};

export default DBPostsPage;