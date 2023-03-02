


function DBSearchFilter({query, onChange, name}){

    return (
        <div>
            <label htmlFor='filter_query'>Filter by {name} 'case sensitive' (start typing below): </label>
            <input id="filter_query" type="text" value={query} onChange={onChange}></input>
        </div>
        
    )

}



export default DBSearchFilter;


