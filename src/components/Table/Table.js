import React from 'react'
import classes from './Table.module.scss'


const Table = props =>{
    return(
        <table className={`table-bordered ${classes.Table}`}>
            <thead>
                <tr>
                    <th onClick={()=>props.sortBy('id')}>Id</th>
                    <th onClick={()=>props.sortBy('name')}>Name</th>
                    <th onClick={()=>props.sortBy('date')}>Date</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((row, index)=>{
                    return(
                        <tr key={index} className={classes.Tr} >                 
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.date}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table