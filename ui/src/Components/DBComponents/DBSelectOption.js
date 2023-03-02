import React from "react";

function SelectOption({IdName, IdNumber}){
    return(
        <option value={IdNumber}>{IdName}</option>
    )
}

export default SelectOption