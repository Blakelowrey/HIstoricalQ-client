import React from 'react';

class AccountInfo extends React.Component{
  
  componentWillMount(){
    this.props.clearEntries();
  }
  
  render(){
    return(
      <header role="banner">
        <h1>account info</h1>
        <p>here will be account info</p>
      </header>
    );  
  }
 



}
export default AccountInfo;