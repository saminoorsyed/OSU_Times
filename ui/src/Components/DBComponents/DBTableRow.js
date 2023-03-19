import React, {useState, useEffect} from "react";
import {MdOutlineClose, MdModeEditOutline, MdAlternateEmail} from 'react-icons/md'

// import components
import DBRowItem from "./DBRowItem";
import DBEditRow from "./DBEditRow";

function DBTableRow({dataObject, columns, idObjects, removeRow, updateDbObject}){
    // toggle edit row render
    const [editClicked, setEditClicked] = useState(false);
    const [editObject, setEditObject] = useState(dataObject);

    // adjust id object in edit object to numbers to represent correct values
    const setDefaultValues = ()=>{
        if (Object.keys(idObjects).length === 0){
            return;
        }
        Object.keys(dataObject).slice(1).forEach((key, index)=>{
            let defaultVal
            if (key.slice(-3) === "_id"){
                idObjects[key].forEach((idList, index)=>{
                    if (idList[0] === dataObject[key]){
                        defaultVal = idList[1]
                    }
                })
                setEditObject(editObject => ({
                        ...editObject,
                        [key]: defaultVal
                    }));

            }
        })
    }

    useEffect(() => {
        setDefaultValues();
    }, [])
    
    function handleSaveClick(e){
        console.log(editObject)
        updateDbObject(editObject, columns)
        e.preventDefault()
    }

    function updateEditObject(e){
        setEditObject(editObject => ({
            ...editObject,
            [e.target.name]: e.target.value
        }));
    }

    return(
        <>
            <tr>
                {columns.map((colName, i)=>
                    <DBRowItem
                        dataObject = {dataObject}
                        key = {i}
                        colName ={colName}
                        />
                        )}
                <td>
                
                <div className="icons">
                    <button onClick={ () =>  removeRow(dataObject[columns[0]]) }>
                        <MdOutlineClose style={{color: "red",fontWeight: "bold" }} />
                    </button>
                    <button onClick={ ()=> setEditClicked(!editClicked) }>
                        <MdModeEditOutline style={{color: "red",fontWeight: "bold" }}/>
                    </button>
                </div>
                </td>
            </tr>
            {editClicked &&
                <tr>
                    <td colSpan={columns.length +2}>
                        <form onSubmit={handleSaveClick}>
                        {columns.slice(1).map((colName, i)=>
                                            <DBEditRow
                                            updateEditObject =  {updateEditObject}
                                            dataObject =    {dataObject}
                                            colName =       {colName}
                                            idObjects=      {idObjects}
                                            key =           {i}
                                            />
                                            )}
                        <button type="submit">Update</button>
                        </form>
                    </td>
                </tr>
            }
        </>
    )
}

export default DBTableRow