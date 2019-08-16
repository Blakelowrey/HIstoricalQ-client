import React from 'react';

class AccountInfo extends React.Component{
  
  componentWillMount(){
    this.props.clearEntries();
  }
  componentDidMount(){
    this.props.getAccountInfo();
    this.props.getFavorites();
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
        <button onClick={()=>this.props.logout()}>logout</button>
        <br/>
        <h3>Your Favorites below!</h3>
      </header>
    );  
  }
 



}
export default AccountInfo;