import React from 'react'
import {Button, Modal } from 'react-bootstrap'

class AddForm extends React.Component{
    constructor(props){
        super()
        this.state={
            data:{
                id: null,
                name:'',
                date:''
            },
            showModal:false
        }
    }

    handleClose = ()=>{
        this.setState({
            showModal:!this.state.showModal,
            data:{id: '', name:'', date:''}
        })
    }

    handleChange = (target, value)=>{
        let arrayCopy = {}
        for(let i in this.state.data){
            arrayCopy[i] = this.state.data[i]
        }
        arrayCopy[target] = value
        this.setState({
            data:arrayCopy
        })
    }

    handleSubmit = ()=>{
        this.props.submit(this.state.data)
        this.handleClose()
    }

    render(){
        let currentBotton
        let el = this.state.data
        let toggle = Object.values(el).every(k => k !== '' || k === null)

        if (toggle) {
            currentBotton = <Button
                variant="primary"
                onClick={this.handleSubmit} 
                title='Заполните все поля'
            >
                Добавить
            </Button>
        } else {
            currentBotton = <Button
            variant="primary"
            title='Заполните все поля'
            disabled
            >
            Добавить
            </Button>
        }

        return(
            <>
                {this.state.showModal 
                    ?
                    <Modal show={this.state.showModal} onHide={this.handleClose} animation={true}>
                        <Modal.Header closeButton>
                        <Modal.Title>Добавление объекта</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div><div>id</div><input data-tag='id' type='number' onChange={event => this.handleChange(event.target.getAttribute('data-tag') ,event.target.value)}/></div>
                            <div><div>Name</div><input data-tag='name' type='text' onChange={event => this.handleChange(event.target.getAttribute('data-tag') ,event.target.value)}/></div>
                            <div><div>Date</div><input data-tag='date' type='date' onChange={event => this.handleChange(event.target.getAttribute('data-tag') ,event.target.value)}/></div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Отмена
                            </Button>
                            {currentBotton}
                        </Modal.Footer>
                    </Modal>
                    : 
                    <Button variant="secondary" onClick={this.handleClose}>Добавить новый объект</Button>
                }
            </>      
        )
    }
}

export default AddForm