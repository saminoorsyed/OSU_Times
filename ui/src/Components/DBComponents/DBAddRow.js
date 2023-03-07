import React from "react";

// import components
import SelectOption from './DBSelectOption';
function DBAddRow({colName, IdObjects, updateNewObject}){

    let isID = false;
    if (colName.slice(-3)=== "_id"){
        isID = true;
    }
    return(
        
        <>
            {isID &&
            <div className="editRow">
                <label htmlFor = {colName}>{colName.slice(0,-3)}
                <select type="text" id={colName}>
                    {IdObjects[colName].map((IDobject, i)=>
                        <SelectOption
                        IdName = {IDobject[0]}
                        IdNumber = {IDobject[1]}
                        key = {i}
                        />)}
                </select>
                </label>
            </div>
        }
        {!isID &&
            <label htmlFor = {colName}>{colName}
                <input name={colName} onChange={updateNewObject} type="text"/>
                {/* <input value={userObj[colName] || ""} onChange={handleCreateNewUser} type="text"/> */}

            </label>
        }
        </>
    )
}

export default DBAddRow