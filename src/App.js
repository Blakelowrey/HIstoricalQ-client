import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from './components/header.js';
import AboutBox from './components/about-box.js';
import SearchForm from './components/search-form.js';
import AccountInfo from './components/account-info.js';
import EntryList from './components/entry-list.js';
import LogInForm from './components/login-form.js';
import SignUpForm from './components/signup-form.js';
import config from './config.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      entries : [],
      loggedIn : false,
      accountInfo : {},
      favoritesIds : [],
    };
  }
  componentWillMount(){
    const jwt = window.localStorage.getItem(config.TOKEN_KEY)
    if(jwt && jwt.length > 10){
      this.setState({loggedIn : true})
    }
  }
  
  setAppState = (params = {}) => {
    this.setState(params);
  }
  
  getAllEntries = () => {
    fetch(`${config.API_ENDPOINT}/entries`)
    .then(res => res.json())
    .then(data =>{
      console.log(`data : ${data}`);
      this.setState({entries:data})
    }).catch(err => console.log(err));

  }
  clearEntries = () => {
    let emptyArray = [];
    this.setState({entries: emptyArray});
  }

  getRandomEntries = (amount = 4) => {
    const paramsString = `?sortBy=${amount}`;
    fetch(`${config.API_ENDPOINT}/entries/random` + paramsString)
    .then(res => res.json())
    .then(data => {
      this.setState({entries: data});
    });
  };

  getSortEntries = (params = {}) => {
    const paramsString = `?sortBy=${params.sortBy}&era=${params.era}`;
    console.log(paramsString);
    fetch(`${config.API_ENDPOINT}/entries/sort`+paramsString ).then(res => res.json())
    .then(data => {
      console.log(`data: ${data}`);
      this.setState({entries : data});
    });
  };

  render(){
    
    return (
      <>
      <Header loggedIn={this.state.loggedIn}/>
      <main role='main'>
        <Route exact path ='/' render={()=>{
           return (<>
           <AboutBox getRandomEntries={this.getRandomEntries}/>
           </>);
         }}/>
        <Route exact path ='/search' render={()=>{
           return (<>
           <SearchForm getSortEntries={this.getSortEntries} clearEntries={this.clearEntries}/>
           </>);
        }}/>
        <Route exact path ='/account' render={()=>{
          return (<>
          <AccountInfo setAppState={this.setAppState} accountInfo={this.state.accountInfo} clearEntries={this.clearEntries}/>
          </>);
        }}/>
        <Route exact path ='/logIn' render={()=>{
          return (
            <LogInForm setAppState={this.setAppState} clearEntries={this.clearEntries}/>
          );
        }}/>
         <Route exact path ='/signUp' render={()=>{
          return (
            <SignUpForm setAppState={this.setAppState} clearEntries={this.clearEntries}/>
          );
        }}/>
        <EntryList setAppState={this.setAppState} favoritesIds={this.state.favoritesIds} loggenIn={this.state.loggedIn} entries={this.state.entries}/>
      </main>
      </>
    );
  }
 
}

export default App;
