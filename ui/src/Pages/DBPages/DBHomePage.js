import React from "react";
import schema from "../../image/schema_20230222.png"

function DBHomePage (){
    return(
    <section>
        <h1>something about our database</h1>
        <div className="overview">
            <h2>Overview</h2>
            <p>OSU Engineering Times posts an average of 20 posts per week, and has a vast
            following of thousands of students who benefit from its informational material. Our
            website is currently a simple html doc, which is difficult to update and manage efficiently.
            With a new data-driven website, we expect our organization to be significantly more
            efficient. We will be able to quickly adjust user facing content according to various
            metrics (reactions, followers, etc). Additionally, we can update informational fields, like
            names, across the whole site with a single adjustment rather than adjusting the html
            content of each page individually.</p>
        </div>

        <img className="schema" src={schema} alt="Database Schema"/>

        
    </section>)
}

export default DBHomePage;