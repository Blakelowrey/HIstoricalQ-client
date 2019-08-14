import React from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Header from './components/header.js';
import AboutBox from './components/about-box.js';
import SearchForm from './components/search-form.js';
import AccountInfo from './components/account-info.js';
import EntryList from './components/entry-list.js';
import LogInForm from './components/login-form.js';
import SignUpForm from './components/signup-form.js';
import config from './config.js';
import TokenService from './token-service.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      entries : [],
      loggedIn : false,
      accountInfo : {},
    };
  }
  login = (params = {username: '', password : ''}) => {
    fetch(`${config.API_ENDPOINT}/users/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then(res => res.json()).then(data =>{
        const {message, token} = data;
        if(message === 'auth success' && token){
          console.log(data);
          TokenService.saveAuthToken(token);
          this.setState({loggedIn : true});
          //this.props.history.push('/account');
        }
    });
  }
  getAccountInfo = () => {
    const jwt = window.localStorage.getItem(config.TOKEN_KEY)
    
    console.log(`bearer ${jwt}`);
    fetch(`${config.API_ENDPOINT}/users/login`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : `bearer ${jwt}`
      }
    }).then(res=>res.json()).then(data =>{
      console.log(data);
    });
        
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
          <AccountInfo getAccountInfo={this.getAccountInfo} clearEntries={this.clearEntries} getAllEntries={this.getAllEntries}/>
          </>);
        }}/>
        <Route exact path ='/logIn' render={()=>{
          return (
            <LogInForm login={this.login}/>
          );
        }}/>
         <Route exact path ='/signUp' render={()=>{
          return (
            <SignUpForm/>
          );
        }}/>
        <EntryList entries={this.state.entries}/>
      </main>
      </>
    );
  }
 
}

export default App;
