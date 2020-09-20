import React, {Component} from 'react';
import Table from './components/Table/Table'
import AddForm from './components/AddForm/AddForm'
import Search from './components/Search/Search'

class App extends Component{
  constructor(props){
    super()
    this.state={
      data:[
        {id: 1, name:'name',date: '2020-09-01'},
        {id: 52, name:'Добавить редактирование',date:'2020-05-04'},
        {id: 24, name:'подтянуть удаление',date:'2000-05-04'},
        {id: 13, name:'Cделать поиск',date:'2012-02-06'},
        {id: 34, name:'ну вроде все',date:'2020-12-04'},
      ],
      useData:[],
      direction:{
        id: 'asc',
        name: 'asc',
        date: 'asc'
      }
    }
  }

  componentDidMount = ()=>{
    try {
      this.setState({useData: [...this.state.data]})
    } catch (error) {
      
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
    let arrayCopy = [...this.state.useData]
    await arrayCopy.sort(this.compareBy(key))
    this.setState({useData: arrayCopy})
  }

  addItem =(item)=>{
    let arrayCopy = [...this.state.useData]
    arrayCopy.unshift(item)
    this.setState({
      useData:arrayCopy
    })
  }

  handleSearch = (event)=>{
    const value = event.toLowerCase()
    let arrayCopy = [...this.state.data]
    let items =[]
 
    let arrayFilter = arrayCopy.filter(el => {
      for(let i in el){
        if(el[i].toString().toLowerCase().includes(value)){
          return items.push(el)
        }
      }   
      return 0
    })
    this.setState({useData: arrayFilter})
  }

  render(){
    return(
      <div>
       <AddForm submit={item => this.addItem(item)}/>
        <Search 
          handleSearch ={this.handleSearch}
        />
        <Table
          data={this.state.useData}
          sortBy={this.sortBy}
        />
      </div>
    )
  }
}

export default App;
