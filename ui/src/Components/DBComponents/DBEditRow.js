import React from "react";

// import components
import IdInput from "./InputComponents/IdInput";
import DateInput from "./InputComponents/DateInput";
import TextInput from "./InputComponents/TextInput";

function DBEditRow({colName, idObjects, updateEditRowObject}){
    let isID = colName.slice(-3) === "_id";
    let isDate = colName.slice(0,4) === "date"
    return(
        <div className="inputRow">
        {isID && <IdInput
                        colName = {colName}
                        updateFunction={updateEditRowObject}
                        idObjects={idObjects}
                        />
        }
        {!isID && !isDate && <TextInput
                                colName={colName}
                                updateFunction = {updateEditRowObject}
                                />
        }
        {isDate && <DateInput
                        colName = {colName}
                        updateFunction = {updateEditRowObject}
                        />
        }
        </div>
    )
}

export default DBEditRow