import React from "react";

// import components
import DateInput from "./InputComponents/DateInput";
import IdInput from "./InputComponents/IdInput";
import TextInput from "./InputComponents/TextInput";
function DBAddRow({colName, idObjects, updateNewObject}){
    let isID = colName.slice(-3) === "_id";
    let isDate = colName.slice(0,4) === "date"
    return(   
        <>
        {isID && <IdInput
                        colName = {colName}
                        updateFunction={updateNewObject}
                        idObjects={idObjects}
                        />
        }
        {!isID && !isDate && <TextInput
                                colName={colName}
                                updateFunction = {updateNewObject}
                                />
        }
        {isDate && <DateInput
                        colName = {colName}
                        updateFunction = {updateNewObject}
                        />
        }
        </>
    )
}

export default DBAddRow