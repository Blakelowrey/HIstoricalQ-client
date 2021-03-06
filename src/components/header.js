import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css'

class Header extends React.Component{

  render(){
    return (
    <nav role='navigation'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className='nav-content'><h2>HistoricalQ</h2></div>
      </Link>
      <Link to='/search' style={{ textDecoration: 'none' }}>
        <div className='nav-content'>search</div>
      </Link>
      {this.props.loggedIn ? 
      <Link to='/account' style={{ textDecoration: 'none' }}>
        <div className='nav-content'>account</div>
      </Link>:
      <Link to='/logIn' style={{ textDecoration: 'none' }}>
        <div className='nav-content'>Log in</div>
      </Link>}
      
    </nav>  
  )}
  
}

export default Header;