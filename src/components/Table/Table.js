import React from 'react'
import {Button, Modal } from 'react-bootstrap'
import classes from './Table.module.scss'


class Table  extends React.Component{
    constructor(props){
        super()
        this.state={
            editData:{
                id: null,
                name:'',
                date:''
            },
            showModal:false,
            editKey:null
        }  
    }

    handleEdit = (row, index)=>{
        this.setState({
            showModal:!this.state.showModal,
            editData: row,
            editKey: index
        })
    }

    handleClose = ()=>{
        this.setState({
            showModal:!this.state.showModal,
        })
    }

    handleChange = (target, value)=>{
        let arrayCopy = {}
        for(let i in this.state.editData){
            arrayCopy[i] = this.state.editData[i]
        }
        arrayCopy[target] = value
        this.setState({
            editData:arrayCopy
        })
    }

    handleSave = ()=>{
       const row = this.state.editData
       const index = this.state.editKey
       this.props.onEditSave(row, index)
       this.handleClose()
    }

    handleDelete =()=>{
        this.props.onDelete(this.state.editKey)
        this.handleClose()
    }

    render(){
        const editform =<Modal show={this.state.showModal} onHide={this.handleClose} animation={true}>
                            <Modal.Header closeButton>
                                <Modal.Title>Редактирование объекта</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div><div>id</div><input value={this.state.editData.id} data-tag='id' type='number' onChange={event => this.handleChange(event.target.getAttribute('data-tag') ,event.target.value)}/></div>
                                <div><div>Name</div><input value={this.state.editData.name} data-tag='name' type='text' onChange={event => this.handleChange(event.target.getAttribute('data-tag') ,event.target.value)}/></div>
                                <div><div>Date</div><input value={this.state.editData.date} data-tag='date' type='date' onChange={event => this.handleChange(event.target.getAttribute('data-tag') ,event.target.value)}/></div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={this.handleDelete}>
                                    Удалить
                                </Button>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Отмена
                                </Button>
                                <Button variant="primary" onClick={this.handleSave}>
                                    Сохранить
                                </Button>
                            </Modal.Footer>
                        </Modal>
        return(
            <React.Fragment>
            {editform}
                <table className={`table-bordered ${classes.Table}`}>
                    <thead>
                        <tr>
                            <th onClick={()=>this.props.sortBy('id')}>Id</th>
                            <th onClick={()=>this.props.sortBy('name')}>Name</th>
                            <th onClick={()=>this.props.sortBy('date')}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((row, index)=>{
                            return(
                                <tr key={index} className={classes.Tr} onClick={() =>this.handleEdit(row, index)}>                 
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default Table