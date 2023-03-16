import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export function DBNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [url, setUrl] = useState(location.pathname);

    const handleNavigation = (event) => {
        const newUrl = event.target.value;
        setUrl(newUrl);
        navigate(newUrl);
    };

return (
    <nav>
        <Link to='/'>Home page</Link>
        <select value = {{url}} onChange={handleNavigation}>
            <option value="/">Select a Table</option> 
            <option value="/DBUsers">Users Table</option>
            <option value="/DBAdmins">Admins Table</option>
            <option value="/DBAuthors">Authors Table</option>
            <option value="/DBUsersAuthors">Users Authors Table</option>
            <option value="/DBGenres">Genres Table</option>
            <option value="/DBPosts">Posts Table</option>
            <option value="/DBComments">Comments Table</option>
            <option value="/DBReactions">Reactions Table</option>
            <option value="/DBReactionIcons">Reaction Icons Table</option>
        </select>
    </nav>
    );
}

export default DBNavigation;
