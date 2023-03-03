import React from "react";
import { useEffect } from "react";
import {useState} from 'react';
// import components
import DBTableHeaders from "./DBTableHeaders";
import DBTableRow from "./DBTableRow";
import DBAddRow from "./DBAddRow";

function DBTable({objects, columns, IdObjects, userObj, handleCreateNewUser, editOnChange, editUserObj}){

    function fake(e){
        e.preventDefault();
        console.log("starting setup to create user")
        createUser();
    }

    const createUser = async (e) => {
        console.log("**********************  Method entry add/create user ***************????")
        
        let url = `http://flip3.engr.oregonstate.edu:4004/api/users/`;
        const response = await fetch (url, {
            method:"POST", 
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': 'application/JSON',
            },
        });
        console.log(response);
        if (response.status === 200){
            let temp = await response.json();
            console.log(temp);
            alert(temp.status)
            window.location.reload();  // force page re-load
        } else {
            alert(`Failed to create movie, status code = ${response.status}`);
        } 
    }

    // useEffect(() => {
    //     fetch("http://flip1.engr.oregonstate.edu:3981/users", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(userObj)
    //     }).then(json => {
    //         handleCreateNewUser(json);
    //     });
    //   }, []);

    return(
        <>
        <table>
            <thead>
                <tr>
                    {
                    columns.map((column, i)=>
                        <DBTableHeaders
                            column = {column}
                            key = {i}
                            />)}
                </tr>
            </thead>
            <tbody>
                {
                objects.map((object, i)=>
                    <DBTableRow
                    editUserObj = {editUserObj}
                    editOnChange = {editOnChange}
                        object = {object}
                        columns = {columns}
                        IdObjects = {IdObjects}
                        key = {i}
                    />)}
                </tbody>
        </table>

        <table>
            <tbody>
            
                <tr>
                
                    <td colSpan={columns.length + 2}>
                        <form onSubmit={fake}>
                            
                        {columns.slice(1).map((colName, i)=>
                                            <DBAddRow
                                                handleCreateNewUser = {handleCreateNewUser}
                                                userObj = {userObj}
                                                colName =   {colName}
                                                IdObjects=  {IdObjects}
                                                key =       {i}
                                                />
                                            )}
                        <button type="submit">Add Row</button>
                        </form>
                    </td>
                </tr>
            </tbody>
            </table>
        </>
    )

    

}
export default DBTable;