import React from 'react'

const DateInput = ({colName, updateFunction}) => {
  return (
    <label htmlFor = {colName}>{colName}
        <input name={colName} onChange={updateFunction} type="datetime-local" step="0.001"/>
        {/* <input value={userObj[colName] || ""} onChange={handleCreateNewUser} type="text"/> */}
    </label> 
  )
}

export default DateInput