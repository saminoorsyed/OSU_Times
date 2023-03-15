import React from 'react'

const IdInput = ({colName, updateFunction, idObjects}) => {
  return (
    <div className="editRow">
        <label htmlFor = {colName}>{colName.slice(0,-3)}
            <select onChange={updateFunction} name = {colName} type="text" id={colName}>
                <option value="">Select an option</option>
                {idObjects[colName].map((idObject, i)=>
                    <option key={i} value={idObject[1]}>{idObject[0]}</option>)}
            </select>
        </label>
    </div>
  )
}

export default IdInput