import React from "react";

// import components
import SelectOption from './DBSelectOption';

function DBEditRow({dataObject, colName, idObjects, updateEditRowObject}){
    let isID = false;
    if (colName.slice(-3)=== "_id"){
        isID = true;
    }
    console.log(idObjects)
    return(
        <>
        {isID &&
            <div className="editRow">
                <label htmlFor = {colName}>{colName.slice(0,-3)}
                    <select onChange={updateEditRowObject} name={colName} type="text" id={colName} >
                        <option value="">Select an option</option>
                        {idObjects[colName].map((idObject, i)=>
                            <option key={i} value={idObject[1]}>{idObject[0]}</option>
                            )}
                    </select>
                </label>
            </div>
        }
        {!isID &&
            <div className="editRow">
                <label htmlFor = {colName}>{colName}
                <input name={colName} onChange={updateEditRowObject}   type="text" placeholder={dataObject[colName]}/>
                </label>
            </div>
        }
        </>
    )
}

export default DBEditRow