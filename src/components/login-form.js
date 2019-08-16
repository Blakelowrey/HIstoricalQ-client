import React from 'react';
import { Link , withRouter } from 'react-router-dom';
import config from '../config.js';
import TokenService from '../token-service.js';




class LogInForm extends React.Component{
 
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }
  componentWillMount(){
    this.props.clearEntries();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email > 2 && this.state.password > 2){
      const props = {
        email: this.state.email,
        password: this.state.password};
      console.log(props);
      this.login(props);
    }
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
          this.props.setAppState({
            loggedIn : true,
            favoriteIds : [0]
          });
          this.props.history.push('/account');
        }
    });
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
        <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
      </div>
      <div>
      <h4>password : </h4>
        <label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
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

export default withRouter(LogInForm);