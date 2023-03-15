import React, {useState} from "react";
import {MdOutlineClose, MdModeEditOutline, MdAlternateEmail} from 'react-icons/md'

// import components
import DBRowItem from "./DBRowItem";
import DBEditRow from "./DBEditRow";

function DBTableRow({dataObject, columns, idObjects, updateEditRowObject, removeRow, updateDbRowObject}){
    // toggle edit row render
    const [editClicked, setEditClicked] = useState(false);
    function handleSaveClick(e){
        updateDbRowObject(dataObject, columns)
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
                                            updateEditRowObject =  {updateEditRowObject}
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