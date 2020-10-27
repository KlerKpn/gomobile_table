import React, {Component} from 'react';
import Table from './components/Table/Table'
import AddForm from './components/AddForm/AddForm'
import Search from './components/Search/Search'
import axios from 'axios'
import './App.scss'

class App extends Component{
  constructor(props){
    super()
    this.state={
      data:[],
      useData:[],
      direction:{
        id: 'asc',
        name: 'asc',
        date: 'asc'
      },
      loading:true
    }
  }

  componentDidMount = ()=>{
    this.getdata()
  }

  getdata = async()=>{
    const localData = [
      {id: 1, name:'name',date: '2020-09-01'},
      {id: 52, name:'добавить редактирование',date:'2020-05-04'},
      {id: 24, name:'подтянуть удаление',date:'2000-05-04'},
      {id: 13, name:'сделать поиск',date:'2012-02-06'},
      {id: 34, name:'ну вроде все',date:'2020-12-04'}
    ]
    try {
      await axios.get('some/url')
        .then(response =>{
          console.log('fdfd');
          this.setState({
            data: response.data,
            loading: false,
            useData: response.data
          })
        })
    } catch (error) {
      console.log(error);
      this.setState({
        data:localData,
        loading: false,
        useData:localData
      })
    }
  }
  compareBy=(key)=>{
    return  (a, b)=>{
      let filt = {...this.state.direction}
      
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
  
  sortBy = async (key)=>{
    let arrayCopy = [...this.state.useData]
    await arrayCopy.sort(this.compareBy(key))
    this.setState({useData: arrayCopy})
  }

  addItem =(item)=>{
    let arrayCopy = [...this.state.useData]
    let data = [...this.state.data]
    arrayCopy.unshift(item)
    data.unshift(item)
    this.setState({
      useData:arrayCopy,
      data
    })
  }

  handleSearch = (event)=>{
    const value = event.toLowerCase()
    let arrayCopy = [...this.state.data]
    let items =[]
    const arrayFilter = arrayCopy.filter(el => {
      for(let i in el){
        if(el[i].toString().toLowerCase().includes(value)){
          return items.push(el)
        } 
      }     
      return null
    })
    this.setState({useData: arrayFilter})
  }

  handleDelete =(index)=>{
    let arrayCopy = [...this.state.useData]
    arrayCopy.splice(index, 1)
    this.setState({
      useData:arrayCopy,
      data:arrayCopy
    })
  }

  handleEditSave =(row, index)=>{
    let arrayCopy = [...this.state.useData]
    arrayCopy[index] = row
    this.setState({
      useData:arrayCopy,
      data:arrayCopy
    })
  }

  render(){
    return(
      <div>
      {this.state.loading 
        ?
          <div className="d-flex justify-content-center" style={{paddingTop: 100}}>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        :
        <>
          <div className='Header'>
            <Search 
              handleSearch ={this.handleSearch}
            />
            <AddForm submit={item => this.addItem(item)}/>
          </div>
          <Table
            data={this.state.useData}
            sortBy={this.sortBy}
            onDelete={this.handleDelete}
            onEditSave={this.handleEditSave}
          />
        </>
      }
      </div>
    )
  }
}

export default App;
