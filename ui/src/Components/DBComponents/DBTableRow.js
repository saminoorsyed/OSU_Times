import React, {useState, useEffect} from "react";
import {MdOutlineClose, MdModeEditOutline, MdAlternateEmail} from 'react-icons/md'

// import components
import DBRowItem from "./DBRowItem";
import DBEditRow from "./DBEditRow";

function DBTableRow({dataObject, columns, idObjects, removeRow, updateDbObject}){
    // toggle edit row render
    const [editClicked, setEditClicked] = useState(false);
    const [editObject, setEditObject] = useState(dataObject);

    const findDefaultValues = ()=>{
        Object.keys(dataObject).forEach((key, index)=>{
            let defaultVal
            console.log(key)
            if (key.slice(-3) === "_id"){
                console.log(typeof idObjects[key])
                idObjects[key].forEach((idList, index)=>{
                    if (idList[0] === dataObject[key]){
                        defaultVal = idList[1]
                    }
                })
                setEditObject({
                    [key]: defaultVal
                })
            }
        })
    }

    useEffect(() => {
        findDefaultValues();
    }, [])
    
    function handleSaveClick(e){
        updateDbObject(editObject, columns)
        e.preventDefault()
    }

    function updateEditObject(e){
        setEditObject({
            ...editObject,
            [e.target.name]: e.target.value
        })
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
                    <button>
                        <MdOutlineClose style={{color: "red",fontWeight: "bold" }} onClick={ () =>  removeRow(dataObject[columns[0]]) }/>
                    </button>
                    <button>
                        <MdModeEditOutline style={{color: "red",fontWeight: "bold" }} onClick={ ()=> setEditClicked(!editClicked) }/>
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