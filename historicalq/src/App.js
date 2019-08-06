import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from './components/header.js';
import AboutBox from './components/about-box.js';
import SearchForm from './components/search-form.js'
import AccountInfo from './components/account-info.js'
import EntryList from './components/entry-list.js'
import STORE from './STORE.js'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      entries : []
    };
  }

  getRandomEntries = (amount = 3) => {
    console.log(this);
    let randomEntries = [];
    let indexArray = [];
    let i = 0;
    while( i < amount){
      let randomIndex = Math.floor(Math.random() * STORE.length)
      let isSame = false;
      indexArray.forEach(index => {
        if(index === randomIndex){
          isSame = true;
        }
      })
      if (!isSame){
        indexArray.push(randomIndex);
        i++;
      }
    }
    console.log(indexArray);
    indexArray.forEach(index => {
      randomEntries.push(STORE[index]);
    })
    console.log(randomEntries);
    this.setState({entries: randomEntries});
    
  }
  getSortEntries = (params = {sortBy: 'alphabetical'}) => {
    let newEntries = [...STORE];
    console.log(newEntries);
    if (params.sortBy) {
      if (params.sortBy === 'alphabetical'){
        newEntries.sort((a,b) =>{
          let charCodeA = a.name.toLowerCase().charCodeAt(0);
          let charCodeB = b.name.toLowerCase().charCodeAt(0);
          return charCodeA - charCodeB;
        })
        console.log(newEntries);
      }
      if (params.sortBy === 'YOB'){
        newEntries.sort((a,b) =>{
          return a.YOB-b.YOB;
        })
        console.log(newEntries);
      }
    }

    this.setState({entries: newEntries});

  };

  render(){
    return (
      <>
      <Header/>
      <main role='main'>
        <Route exact path ='/' render={()=>{
           return (<>
           <AboutBox getRandomEntries={this.getRandomEntries} />
           <EntryList entries={this.state.entries}/>
           </>);
         }}/>
        <Route exact path ='/search' render={()=>{
           return (<>
           <SearchForm getSortEntries={this.getSortEntries}/>
           <EntryList entries={this.state.entries}/>
           </>);
        }}/>
        <Route exact path ='/account' render={()=>{
          return (<>
          <AccountInfo/>
          <EntryList entries={this.state.entries}/>
          </>);
        }}/>
        
      </main>
      </>
    );
  }
 
}

export default App;
