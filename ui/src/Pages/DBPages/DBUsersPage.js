import React, { useEffect } from "react";
import {useState} from 'react';

// import components
import DBTable from "../../Components/DBComponents/DBTable";
import DBSearchFilter from "../../Components/DBComponents/DBSearchFilter";
import { MdAlternateEmail } from "react-icons/md";

function DBUsersPage(){
    let fakeUsers = [
        {
            "user_id":6,
            "username":"Fake1",
            "fname":"Super Fake",
            "lname":"SomeFake",
            "email":"kjneway@voyager.com",
        },{
            "user_id":9,
            "username":"Fake1",
            "fname":"Super Fake",
            "lname":"SomeFake",
            "email":"kjneway@voyager.com",
        }
    ]
    let dbUsers = [                
        {
            "user_id":0,
            "username":"Captain",
            "fname":"Kathryn",
            "lname":"Janeway",
            "email":"kjneway@voyager.com",
        },
        {
            "user_id": 1,
            "username":"Commander",
            "fname": "Amal",
            "lname": "Chakotay",
            "email": "achakotay@makis.com",
        },
        {
            "user_id":2,
            "username":"Lieutenant",
            "fname": "Tom",
            "lname": "Paris",
            "email":"tparis@starfleet.com",
        }
    ]

    
    let dbColumns = ["user_id", "username", "fname", "lname", "email"];
    let IdObjects = {}
    let userObj = {};
    for(let i = 0; i < dbColumns.length; i++){
        userObj[dbColumns[i]] = "Chicago";
    }

    let origNewUserObj = {
        fname: "Apple",
        lname: "MSFT",
        username: "Google",
        email: "Shcwab@email.com"
    };

    let origEditUserObj = {
        fname: "Apple",
        lname: "MSFT",
        username: "Google",
        email: "Shcwab@email.com"
    };

    const [columns, setColumns] = useState(dbColumns);
    const [users, setUsers] = useState(dbUsers);
    const [query, setQuery] = useState('');
    const results = filterItems(users, query);
    const [newUserObj, setNewUserObj] = useState(origNewUserObj);
    const [editUserObj, setEditUserObj] = useState(origEditUserObj)

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


    
    // runs continuously if enter state users instead of []
    // function keeps re-running assuming it might be due to filter
    useEffect(() => {
        const getUsers = async() => {
            try {
                let response = await fetch("http://flip3.engr.oregonstate.edu:3981/users");
                // console.log(response);
                let data = await response.json();
                console.log(data);
                setUsers(data);
            } catch(error){
                console.log(error.stack);
            }
        }

        getUsers();
    }, [])
    

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
            columns = {columns}
            IdObjects = {IdObjects}/>
        <br />
        {/* I want button to load original sql data in case person deletes everything */}
        <button onClick={() => setUsers(fakeUsers)}>(Placeholder Future Functionality)</button>
    </section>
    );
};

export default DBUsersPage;