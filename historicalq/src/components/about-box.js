import React from 'react';

class AboutBox extends React.Component{

  componentDidMount(){
    this.props.getRandomEntries();
  }
  

  render(){
    return(
      <header role="banner">
        <h1>HistoricalQ</h1>
        <p>An application for accessing and viewing a personally currated list of historical figures and the relationships between them</p>
      </header>
    );
    
  }
  



}
export default AboutBox;