import React from "react";

function DBTableHeaders({column}){
    let isID = false;
    if (column.slice(-3)=== "_id"){
        isID = true;
    }
    return(
        <>
            {isID && <th>{column.slice(0,-3)}</th>}
            {!isID && <th>{column}</th>}
        </>
    );
};

export default DBTableHeaders;