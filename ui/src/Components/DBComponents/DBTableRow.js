import React, {useState} from "react";
import {MdOutlineClose, MdModeEditOutline, MdAlternateEmail} from 'react-icons/md'

// import components
import DBRowItem from "./DBRowItem";
import DBEditRow from "./DBEditRow";

function DBTableRow({object, columns,IdObjects, editUserObj, editOnChange}){
   
    function deleteUser(id){
        
       
        async function RemoveFromDatabase(){
            
            let response = await fetch(`http://flip3.engr.oregonstate.edu:4004/api/users/${id}`,
            {
                method:"DELETE"
            });
            let data = await response.json();
            alert(data.status);
        }

        RemoveFromDatabase();
        
        window.location.reload();  // force page re-load
    }

        // *************************************
                // *************************************
        // *************************************

    const editRecord = (id, editUserObj) => {
        console.log(editUserObj);
        console.log(JSON.stringify(editUserObj))
        console.log(id)
        alert("Why won't this work?")
        updateUserInDatabase(id, editUserObj);
    }
    // function editUser(e, id, editUserObj){
    //     e.preventDefault();
    //     console.log("Obj: ")
    //     console.log(editUserObj)
    //     alert("Did obj have values?")
    //     updateUserInDatabase(id, editUserObj)
    // }

    const updateUserInDatabase = async (id,editUserObj ) => {
        console.log("**********************  Method entry edit user ***************????")
        alert("Help me!");
        let url = `http://flip3.engr.oregonstate.edu:4004/api/users/${id}`;
        const response = await fetch (url, {
            method:"PUT", 
            body: JSON.stringify(editUserObj),
            headers: {
                'Content-Type': 'application/JSON',
            },
        });
        console.log(response);
        alert("Dying")
        if (response.status === 200){
            let temp = await response.json();
            console.log(temp);
            alert(temp.status)
            // window.location.reload();  // force page re-load
        } else {
            alert(`Failed to edit user, status code = ${response.status}`);
        } 
        
    }

    // function updateUserInDatabase(id){
        
    //     async function updateUser(){
            
    //         let response = await fetch(`http://flip1.engr.oregonstate.edu:3981/users/${id}`,
    //         {
    //             method:"PUT"
    //         });
    //         let data = await response.json();
    //         alert(data.status);
    //     }

    //     updateUser();
    //     window.location.reload();  // force page re-load
    // }


    const handleDeleteClick = (id, username)=>{
        // alert(`you deleted ${username} with an id of ${id}`)
        deleteUser(id);
    };
    const handleEditClick = (item1, item2)=>{
        let editToggle =  !editClicked;
        setEditClicked(editToggle);
        console.log(item1)
        console.log(item2);

    }
    let [editClicked, setEditClicked] = useState(false);
    return(
        <>
            <tr>
                {columns.map((colName, i)=>
                    <DBRowItem
                        object = {object}
                        key = {i}
                        colName ={colName}
                        />
                        )}
                <td>
                <MdOutlineClose style={{color: "red",fontWeight: "bold" }} onClick={ () =>  handleDeleteClick(object[columns[0]], object[columns[1]]) }/>
                
                <MdModeEditOutline style={{color: "red",fontWeight: "bold" }} onClick={ () =>  handleEditClick(object[columns[0]], object[columns[1]]) }/>
                </td>
            </tr>
            {editClicked &&
                <tr>
                    <td colSpan={columns.length +2}>
                        <form>
                        {columns.slice(1).map((colName, i)=>
                                            <DBEditRow
                                            editUserObj = {editUserObj}
                                            editOnChange = {editOnChange}
                                                object =    {object}
                                                colName =   {colName}
                                                IdObjects=  {IdObjects}
                                                key =       {i}
                                                />
                                            )}
                        <button onClick={ () => editRecord(object[columns[0]], editUserObj)}>Update</button>
                        </form>
                    </td>
                </tr>
            }
        </>
    )
}

export default DBTableRow