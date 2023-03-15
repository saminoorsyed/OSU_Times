import React from "react";

// import components
import SelectOption from './DBSelectOption';
function DBAddRow({colName, idObjects, updateNewObject}){
    let isID = colName.slice(-3) === "_id";
    let isDate = colName.slice(0,4) === "date"
    return(   
        <>
            {isID &&
            <div className="editRow">
                <label htmlFor = {colName}>{colName.slice(0,-3)}
                <select onChange={updateNewObject} name = {colName} type="text" id={colName}>
                    <option value="">Select an option</option>
                    {idObjects[colName].map((idObject, i)=>
                        <option key={i} value={idObject[1]}>{idObject[0]}</option>)}
                </select>
                </label>
            </div>
        }
        {!isID && !isDate &&
            <label htmlFor = {colName}>{colName}
                <input name={colName} onChange={updateNewObject} type="text"/>
                {/* <input value={userObj[colName] || ""} onChange={handleCreateNewUser} type="text"/> */}

            </label>
        }
        {isDate &&
           <label htmlFor = {colName}>{colName}
                <input name={colName} onChange={updateNewObject} type="datetime-local" step="0.001"/>
                {/* <input value={userObj[colName] || ""} onChange={handleCreateNewUser} type="text"/> */}
            </label> 
        }
        </>
    )
}

export default DBAddRow