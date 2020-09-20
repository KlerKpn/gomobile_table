import React, { Component } from 'react'

class Search extends Component{
    render(){
        return(
            <div>
                <input onChange={event => this.props.handleSearch(event.target.value)}/>
            </div>
        )
    }
}

export default Search