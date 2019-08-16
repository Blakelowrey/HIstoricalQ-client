import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
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
      favoritesIds : [],
      redirect : false,
      redirectTarget: '/'
    };
  }
  componentWillMount(){
    const jwt = window.localStorage.getItem(config.TOKEN_KEY)
    if(jwt && jwt.length > 10){
      this.setState({loggedIn : true})
    }
  }
  getFavoritesIds = () => {
    const jwt = window.localStorage.getItem(config.TOKEN_KEY);
    fetch(`${config.API_ENDPOINT}/users/favorites/arr`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : `bearer ${jwt}`
      }
    }).then(res => res.json()).then(data =>{
        const {message} = data;
        if(!message){
          console.log(data);
          let ids = [];
          data.forEach(item => ids.push(item.entry_ref))
          console.log(ids);
          this.setState({favoritesIds : ids});
        }
    });

  }
  deleteFavorite = (entry_ref) => {
    let params = {entry_ref};
    const jwt = window.localStorage.getItem(config.TOKEN_KEY);
    fetch(`${config.API_ENDPOINT}/users/favorites`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        'Authorization' : `bearer ${jwt}`
      },
      body: JSON.stringify(params)})
      .then(res => res.json())
      .then(data=>{
        console.log(data);
        let favoritesIdsCopy = [...this.state.favoritesIds];
        favoritesIdsCopy = favoritesIdsCopy.filter(id => {
          return (id !== entry_ref);
        });
        this.setState({favoritesIds : favoritesIdsCopy})
      })
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
          this.setState({
            loggedIn : true,
            favoriteIds : [0]
          });
          this.redirectToTarget('/account')
        }
    });
  }
  logout = () => {
    TokenService.clearAuthToken();
    this.setState({
      entries : [],
      loggedIn : false,
      accountInfo : {},
      favoritesIds : []
    });
  }
  createUser = (params = {username : '', password : '', email : ''})  => {
    fetch(`${config.API_ENDPOINT}/users/create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(res => res.json()).then(data =>{
        const {message, token} = data;
        if(message === 'user created'&& token){
          console.log(data);
          TokenService.saveAuthToken(token);
          this.setState({loggedIn : true});
          this.redirectToTarget('/account');
        }
    });
  }
  redirectToTarget = (target = '/') => {
    this.props.history.push(target);
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
      //const {} = data
      console.log(data);
      this.setState({accountInfo : data});
    });  
  }
  addFavorite=(params={})=>{
    console.log(params);
    const jwt = window.localStorage.getItem(config.TOKEN_KEY);
    fetch(`${config.API_ENDPOINT}/users/favorites`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization' : `bearer ${jwt}`
      },
      body: JSON.stringify(params)
    })
    .then(res=>res.json())
    .then(data => {
      console.log(data);
      let favoritesIdsCopy = [...this.state.favoritesIds];
        favoritesIdsCopy.push(params.entryId)
        this.setState({favoritesIds : favoritesIdsCopy})
    });

  }
  getFavorites= () => {
    const jwt = window.localStorage.getItem(config.TOKEN_KEY)
    
    console.log(`bearer ${jwt}`);
    fetch(`${config.API_ENDPOINT}/users/favorites`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : `bearer ${jwt}`
      }
    })
    .then(res=>res.json())
    .then(data =>{
      console.log(data);
      this.setState({entries: data});
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
          <AccountInfo logout={this.logout} getFavorites={this.getFavorites} accountInfo={this.state.accountInfo} getAccountInfo={this.getAccountInfo} clearEntries={this.clearEntries} getAllEntries={this.getAllEntries}/>
          </>);
        }}/>
        <Route exact path ='/logIn' render={()=>{
          return (
            <LogInForm login={this.login} clearEntries={this.clearEntries}/>
          );
        }}/>
         <Route exact path ='/signUp' render={()=>{
          return (
            <SignUpForm clearEntries={this.clearEntries} createUser={this.createUser}/>
          );
        }}/>
        <EntryList deleteFavorite={this.deleteFavorite} loggenIn={this.state.loggedIn} addFavorite={this.addFavorite} favoritesIds={this.state.favoritesIds} getFavoritesIds={this.getFavoritesIds} entries={this.state.entries}/>
      </main>
      </>
    );
  }
 
}

export default App;
