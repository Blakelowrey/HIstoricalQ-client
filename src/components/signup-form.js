import React from 'react';

import { Link } from 'react-router-dom';


class SignUpForm extends React.Component{
 
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password1: '',
      password2: '',
      username: '',
      about: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const info = [this.state.email, this.state.password1, this.state.password2, this.state.username];
    let isMissingInfo = false;
    for (let i = 0; i<info.length;i++){
      if(info[i].length<1){
        isMissingInfo = true;
      }
    }
    if (!isMissingInfo&& this.state.password1 === this.state.password2){
    
      const props = {
        email: this.state.email,
        password: this.state.password1,
        username: this.state.username,
        about: this.state.about,
      };
      console.log(props);
      this.props.createUser(props);
    }
    
  }
  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }
  handlePassword1Change = (event) => {
    this.setState({password1: event.target.value});
  }
  handlePassword2Change = (event) => {
    this.setState({password2: event.target.value});
  }
  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }
  handleAboutChange = (event) => {
    this.setState({about: event.target.value});
  }

  render(){
    
    return (
    <header role="banner">
    <h1>Create Account</h1>
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
        <input type="password" value={this.state.password1} onChange={this.handlePassword1Change}/>
        </label>
      </div>
      <div>
      <h4>repeat password : </h4>
        <label>
        <input type="password" value={this.state.password2} onChange={this.handlePassword2Change}/>
        </label>
      </div>
      <div>
      <h4>username : </h4>
        <label>
          <textarea value={this.state.username} onChange={this.handleUsernameChange} />
        </label>
      </div>
      <div>
      <h4>About (optional) : </h4>
        <label>
          <textarea value={this.state.about} onChange={this.handleAboutChange} />
        </label>
      </div>
      <input type="submit" value="Submit" />
    </form>
    </header>

    )

  }

}

export default SignUpForm;