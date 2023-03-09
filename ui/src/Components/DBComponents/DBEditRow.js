import React from "react";

// import components
import SelectOption from './DBSelectOption';

function DBEditRow({dataObject, colName, IdObjects, updateEditRowObject}){
    let isID = false;
    if (colName.slice(-3)=== "_id"){
        isID = true;
    }
    return(
        <>
        {isID &&
            <div className="editRow">
                <label htmlFor = {colName}>{colName.slice(0,-3)}
                    <select onChange={updateEditRowObject} name={colName} type="text" id={colName} >
                        <option value="">Select an option</option>
                        {IdObjects[colName].map((IdObject, i)=>
                            <option key={i} value={IdObject[1]}>{IdObject[0]}</option>
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