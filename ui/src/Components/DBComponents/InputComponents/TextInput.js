import React from 'react'

const TextInput = ({colName, updateFunction}) => {
  return (
    <label htmlFor = {colName}>{colName}
        <input name={colName} onChange={updateFunction} type="text"/>
    </label>
  )
}

export default TextInput