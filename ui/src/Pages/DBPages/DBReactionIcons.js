import React, { useEffect } from "react";
import {useState} from 'react';

// import api functions
import { deleteObjects, getObjectColumnNames, getObjects, postObject, updateDatabaseObject } from "../../api/reactionIconsApi";

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";
import { MdAlternateEmail } from "react-icons/md";


function DBReactionIconsPage(){
    // set objects to populate tables
    const [columnNames, setColumnNames] = useState([]);
    const [dataObjects, seDataObjects] = useState([]);
    let idObjects = {
        "user_id": [["Moral Officer",0],[ "Chief Engineer",1], ["Lead Botanist",2]],
        "author_id": [["TheDoctor",0], ["Borg",1], ["Lieutenant",2]]
    }
    // set objects for the filter
    const [query, setQuery] = useState('');
 
    // set objects for lifting state
    const [newRowObject, setNewRowObject] = useState({});

    // functions for lifting up state

    function updateNewObject(e){
        setNewRowObject(
            {
                ...newRowObject,
                [e.target.name]: e.target.value
            }
        );
    }

    async function updateDbObject(editedObject, columnNames){
        const id = editedObject[columnNames[0]]
        console.log(id)
        await updateDatabaseObject(id, editedObject);
        seDataObjects(await getObjects());
    };

    function filterItems(items, query){
        return items.filter(item => item["reaction_type"].includes(query))
    }
    function handleChange(e){
        setQuery(e.target.value);
    }
    // functions to send send requests to databases
    async function createRow(newRowObject){
        await postObject(newRowObject)
        seDataObjects(await getObjects());
    };
    async function removeRow(id){
        await deleteObjects(id);
        seDataObjects(await getObjects());
    }
    // mount column names for table
    useEffect(() => {
            async function getColumnNames(){
                const names = await getObjectColumnNames();
                setColumnNames(names)
            }
            getColumnNames();
        }, []
    );
    // fetch objects to populate tables upon component mount
    useEffect(() => {
        async function populateObjects(){
            const data = await getObjects();
            seDataObjects(data);
        }
        populateObjects();
        }, []
    );
    // set initial state of new user object and edit user object based on columns from database
    useEffect(() => {
        // Create an object with initial values for each input
        const ObjInitialState = {};
        columnNames.slice(1).forEach(title => {
            ObjInitialState[title] = '';
        });
        setNewRowObject(ObjInitialState);
        }, [columnNames]
    );
    const results = filterItems(dataObjects, query)
    return(
    <section>
        <h2>Welcome to the Reaction Icons Table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"reaction_type"}
        />
        <DBTable
            dataObjects = {results}
            columns = {columnNames}
            idObjects = {idObjects}
            updateDbObject = {updateDbObject}
            newRowObject = {newRowObject}
            updateNewObject={updateNewObject}
            createRow = {createRow}
            removeRow = {removeRow}
            />
        <br />
        {/* I want button to load original sql data in case person deletes everything */}
        {/* <button onClick={() => setUsers(fakeUsers)}>(Placeholder Future Functionality)</button> */}
    </section>
    );
};

export default DBReactionIconsPage;