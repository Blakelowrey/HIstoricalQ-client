import React from 'react';

class SignUpForm extends React.Component{
 
  constructor(props){
    super(props)
    this.state = {
      username: null,
      password1: null,
      password2: null,
      fullName: null,
      about: null
    }
  }

  handleSubmit = () => {



  }
  

  render(){
    
    return (
    <header role="banner">
    <h1>Create Account</h1>
    <form onSubmit={this.handleSubmit}>


    </form>



    </header>

    )

  }

}

export default SignUpForm;