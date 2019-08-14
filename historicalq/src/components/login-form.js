import React from 'react';
import SignUpForm from './signup-form.js';
import { Link } from 'react-router-dom';


class LogInForm extends React.Component{
 
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const props = {
      email: this.state.email,
      password: this.state.password};
    console.log(props);
    this.props.login(props);
  }
  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }
  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  render(){
    
    return (
    <header role="banner">
    <h1>Log In</h1>
    <form onSubmit={this.handleSubmit}>
      <div>
      <h4>Email : </h4>
        <label>
          <textarea value={this.state.email} onChange={this.handleEmailChange} />
        </label>
      </div>
      <div>
      <h4>password : </h4>
        <label>
          <textarea value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
      </div>
      <input type="submit" value="Submit" />
    </form>
    <br/>
    <Link to='/SignUp' style={{ textDecoration: 'none' }}>
        <div className='nav-content'>Create Account</div>
    </Link>


    </header>

    )

  }

}

export default LogInForm;