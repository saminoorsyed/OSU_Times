import React from 'react'

const TextInput = ({colName, updateFunction}) => {
  return (
    <>
    <label htmlFor = {colName}>{colName}</label>
        <input name={colName} onChange={updateFunction} type="text"/>
    </>
  )
}

export default TextInput