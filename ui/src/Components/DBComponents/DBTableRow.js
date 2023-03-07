import React, {useState} from "react";
import {MdOutlineClose, MdModeEditOutline, MdAlternateEmail} from 'react-icons/md'

// import components
import DBRowItem from "./DBRowItem";
import DBEditRow from "./DBEditRow";

function DBTableRow({dataObject, columns, IdObjects, editRowObject, updateEditRowObject, removeRow, updateDbRowObject}){
    // toggle edit row render
    const [editClicked, setEditClicked] = useState(false);

    function handleSaveClick(e){
        updateDbRowObject(dataObject, columns)
        console.log(editRowObject)
        e.preventDefault()
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
                {/* object[columns[0]] is the Id of the object populating the row */}
                <MdOutlineClose style={{color: "red",fontWeight: "bold" }} onClick={ () =>  removeRow(dataObject[columns[0]]) }/>
                <MdModeEditOutline style={{color: "red",fontWeight: "bold" }} onClick={ ()=> setEditClicked(!editClicked) }/>
                </td>
            </tr>
            {editClicked &&
                <tr>
                    <td colSpan={columns.length +2}>
                        <form onSubmit={handleSaveClick}>
                        {columns.slice(1).map((colName, i)=>
                                            <DBEditRow
                                            updateEditRowObject =  {updateEditRowObject}
                                            dataObject =    {dataObject}
                                            colName =       {colName}
                                            IdObjects=      {IdObjects}
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