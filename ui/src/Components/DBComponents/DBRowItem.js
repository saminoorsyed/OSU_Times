import React from 'react';

function DBRowItem({object,colName}){

    return(

        <td>
            <div className="tableItem">{object[colName]}</div>
        </td>
    )
}

export default DBRowItem;