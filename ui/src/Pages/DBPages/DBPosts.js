import React, { useEffect } from "react";
import {useState} from 'react';

// import api functions
import { deleteObjects, getObjectColumnNames, getObjects, postObject, updateDatabaseObject, getIdObjectsGenres, getIdObjectsAuthors } from "../../api/postsApi";

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";



function DBPostsPage(){
    // set objects to populate tables
    const [columnNames, setColumnNames] = useState([]);
    const [dataObjects, seDataObjects] = useState([]);
    const [idObjects, setIdObjects] = useState({});
    // set objects for the filter
    const [query, setQuery] = useState('');
    
    // set objects for lifting state
    const [newRowObject, setNewRowObject] = useState({});
    const [editRowObject, setEditRowObject] = useState({})
    // variables to ensure that objects have loaded
    const [idObjectsLoad, setIdObjectsLoad] = useState(false)
    // functions for lifting up state

    function updateNewObject(e){
        setNewRowObject(
            {
                ...newRowObject,
                [e.target.name]: e.target.value
            }
        );
    }

    function updateEditRowObject(e){
        console.log({[e.target.name]: e.target.value})
        setEditRowObject(
            {
                ...editRowObject,
                [e.target.name]: e.target.value
            }
        );
    }
    async function updateDbRowObject(rowObject, columnNames){
        const id = rowObject[columnNames[0]]
        const updatedEditRowObject = {
            ...editRowObject,
            [columnNames[0]]: rowObject[columnNames[0]]
        }
    await updateDatabaseObject(id, updatedEditRowObject);
    seDataObjects(await getObjects());
}

    function filterItems(items, query){
        return items.filter(item => item["title"].includes(query))
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

    useEffect (()=>{
        async function populateSelect(){
            const genresNamesList = await getIdObjectsGenres();
            const authorNamesList = await getIdObjectsAuthors();
            console.log({genresNamesList, authorNamesList})
            setIdObjects({
                "genre_id": genresNamesList,
                "author_id": authorNamesList
            }) 
            setIdObjectsLoad(true)
        }
        populateSelect()

    },[])
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
        setEditRowObject(ObjInitialState);
        }, [columnNames]
    );
    const results = filterItems(dataObjects, query)
    return(
    <>
    {idObjectsLoad && 
        <section>
        <h2>Welcome to the Posts Table page</h2>
        <DBSearchFilter
            query={query}
            onChange={handleChange}
            name={"Title"}
        />
        <DBTable
            dataObjects = {results}
            columns = {columnNames}
            idObjects = {idObjects}
            editRowObject = {editRowObject}
            updateEditRowObject = {updateEditRowObject}
            updateDbRowObject = {updateDbRowObject}
            newRowObject = {newRowObject}
            updateNewObject={updateNewObject}
            createRow = {createRow}
            removeRow = {removeRow}
            />
        <br />
        {/* I want button to load original sql data in case person deletes everything */}
        {/* <button onClick={() => setUsers(fakeUsers)}>(Placeholder Future Functionality)</button> */}
    </section>}
    </>
    );
};

export default DBPostsPage;