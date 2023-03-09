import React from 'react';

function DBRowItem({dataObject, colName}){

    return(

        <td>
            <div className="tableItem">{dataObject[colName]}</div>
        </td>
    )
}

export default DBRowItem;