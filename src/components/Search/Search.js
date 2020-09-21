import React from 'react'

export default props=>(
    <div>
        <input placeholder='Поиск' onChange={event => props.handleSearch(event.target.value)}/>
    </div>
)