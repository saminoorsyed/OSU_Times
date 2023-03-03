import React, { useEffect } from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";
import { MdAlternateEmail } from "react-icons/md";

function DBUsersPage(){
    // set objects to populate tables
    const [columnNames, setColumnNames] = useState([]);
    const [dataObjects, setDataObjects] = useState([]);

    // set objects for the filter
    const [query, setQuery] = useState('');
    const results = filterItems(dataObjects, query);

    const [newUserObj, setNewUserObj] = useState(origNewUserObj);
    const [editUserObj, setEditUserObj] = useState(origEditUserObj)

    // functions for lifting up state

    function updatesNewUserObj(e){

        setNewUserObj(
            {
                ...newUserObj,
                [e.target.name]: e.target.value
            }
        );
    }

    function updateEditUserObj(e){

        setEditUserObj(
            {
                ...editUserObj,
                [e.target.name]: e.target.value
            }
        );
    }


    function filterItems(items, query){
        return items.filter(item => item.username.includes(query))
    }


    function handleChange(e){
        setQuery(e.target.value);
    }


    // fetch column names upon component mount 
    useEffect(() => {
        const fetchColumnNames = async () => {
            try {
            const response = await fetch('http://flip3.engr.oregonstate.edu:4004/api/ReactionIcons/columns');
            const data = await response.json();
            const names = data.map((column) => column.COLUMN_NAME);
            setColumnNames(names);
            } catch (error) {
                console.error(error);
            }
        };
        fetchColumnNames();
        }, []);
    // fetch objects to populate tables upon component mount
    useEffect(() => {
        const fetchObjects = async () => {
            try {
            const response = await fetch('http://flip3.engr.oregonstate.edu:4004/api/users/');
            const data = await response.json()
            setDataObjects(data);
            console.log(data)
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchObjects();

        }, []);

    return(
    <section>
        <h2>Welcome to the Users Table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"username"}
        />
        <DBTable
            editUserObj = {editUserObj}
            editOnChange = {updateEditUserObj}
            handleCreateNewUser = {updatesNewUserObj}
            userObj = {newUserObj}
            objects = {results}
            columns = {columnNames}
            IdObjects = {IdObjects}/>
        <br />
        {/* I want button to load original sql data in case person deletes everything */}
        <button onClick={() => setUsers(fakeUsers)}>(Placeholder Future Functionality)</button>
    </section>
    );
};

export default DBUsersPage;