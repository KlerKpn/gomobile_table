import React, {Component} from 'react';
import Table from './components/Table/Table'
import AddForm from './components/AddForm/AddForm'

class App extends Component{
  constructor(props){
    super()
    this.state={
      data:[
        {id: 1, name:'name',date: '2020-09-01'},
        {id: 2, name:'name2',date:'2020-05-04'},
      ],
      direction:{
        id: 'asc',
        name: 'asc',
        date: 'asc'
      }
    }
  }

  compareBy=(key)=>{
    return  (a, b)=>{
      let filt = {}
      for(let i in this.state.direction){
        filt[i] = this.state.direction[i]
      }
      if(filt[key] === 'asc') {
        filt[key] = 'desc'
        this.setState({direction: filt})
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      } else {
        filt[key] = 'asc'
        this.setState({direction: filt})
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      }
      
    }
  }
  
  sortBy= async (key)=>{
    let arrayCopy = [...this.state.data]
    await arrayCopy.sort(this.compareBy(key))
    this.setState({data: arrayCopy})
  }

  addItem =(item)=>{
    let arrayCopy = [...this.state.data]
    arrayCopy.unshift(item)
    this.setState({
      data:arrayCopy
    })
  }

  render(){
    return(
      <div>
       <AddForm submit={item => this.addItem(item)}/>
        <Table
          data={this.state.data}
          sortBy={this.sortBy}
        />
      </div>
    )
  }
}

export default App;
