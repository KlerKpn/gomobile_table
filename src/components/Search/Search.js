import React from 'react'

export default props=>(
    <div>
        <input onChange={event => props.handleSearch(event.target.value)}/>
    </div>
)