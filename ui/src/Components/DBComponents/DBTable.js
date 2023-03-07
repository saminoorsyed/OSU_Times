import React from "react";
import { useEffect } from "react";
import {useState} from 'react';
// import components
import DBTableHeaders from "./DBTableHeaders";
import DBTableRow from "./DBTableRow";
import DBAddRow from "./DBAddRow";

function DBTable({dataObjects, columns, IdObjects, editRowObject, updateEditRowObject, updateDbRowObject, newRowObject, updateNewObject, createRow, removeRow, editRow}){

    function handleAddClick(e){
        e.preventDefault();
        console.log(newRowObject)
        createRow(newRowObject);
    }
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
                dataObjects.map((dataObject, i)=>
                    <DBTableRow
                    dataObject = {dataObject}
                    columns = {columns}
                    IdObjects = {IdObjects}
                    editRowObject = {editRowObject}
                    updateEditRowObject = {updateEditRowObject}
                    removeRow ={removeRow}
                    editRow = {editRow}
                    updateDbRowObject = {updateDbRowObject}
                    key = {i}
                    />)}
                </tbody>
        </table>

        <table>
            <tbody>
            
                <tr>
                
                    <td colSpan={columns.length + 2}>
                        <form onSubmit={handleAddClick}>
                            
                        {columns.slice(1).map((colName, i)=>
                                            <DBAddRow
                                                updateNewObject =   {updateNewObject}
                                                colName =           {colName}
                                                IdObjects=          {IdObjects}
                                                key =               {i}
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