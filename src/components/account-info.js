import React from 'react';
import config from '../config.js';
import TokenService from '../token-service.js';
import { withRouter } from 'react-router-dom';


class AccountInfo extends React.Component{
  
  componentWillMount(){
    this.props.clearEntries();
  }
  componentDidMount(){
    this.getAccountInfo();
    this.getFavorites();
  }
  logout = () => {
    TokenService.clearAuthToken();
    this.props.setAppState({
      loggedIn : false,
      accountInfo : {},
      favoritesIds : []
    });
    this.props.history.push('/');
  }
  getFavorites = () => {
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
      this.props.setAppState({entries: data});
    });  
  }
  deleteAccount = () => {
    const jwt = window.localStorage.getItem(config.TOKEN_KEY)
    
    console.log(`bearer ${jwt}`);
    fetch(`${config.API_ENDPOINT}/users/login`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization' : `bearer ${jwt}`
      }
    })
    .then(res=>res.json())
    .then(data =>{
      console.log(data);
      const {message} = data;
      if (message === 'user delete success'){
        this.logout();
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
      //const {} = data
      console.log(data);
      this.props.setAppState({accountInfo : data});
    });  
  }
  render(){
    return(
      <header role="banner">
        <h1>account info</h1>
        {this.props.accountInfo.username?
        <>
        <h3>username: </h3>
        <h4>{this.props.accountInfo.username}</h4>
        </>
        : ''}
        {this.props.accountInfo.email?
        <>
        <h3>email: </h3>
        <h4>{this.props.accountInfo.email}</h4>
        </>
        : ''}
        {this.props.accountInfo.about && this.props.accountInfo.about.length > 1 ?
        <>
        <h3>about: </h3>
        <h4>{this.props.accountInfo.about}</h4>
        </>
        : ''}
        <br/>
        <button onClick={()=>this.logout()}>logout</button>
        <button onClick={()=>this.deleteAccount()}>deleteAccount</button>
        <br/>
        <h3>Your Favorites below!</h3>
      </header>
    );  
  }
 



}
export default withRouter(AccountInfo);