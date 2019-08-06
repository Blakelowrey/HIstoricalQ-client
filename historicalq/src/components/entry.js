import React from 'react';

class Entry extends React.Component {
  constructor(props){
    super(props);
    this.state = {expanded: false}
  }
 
  render(){
    return(
      <section onClick={e=>{
        e.preventDefault();
        this.setState({expanded : !this.state.expanded});
      }}>
        <h3>{this.props.entry.name}</h3>
        <p>{this.props.entry.desc}</p>
        {this.state.expanded?
        <div className='expanded-info'>
          <p>Year of Birth: {this.props.entry.YOB}{this.props.entry.EOB}</p>
          <p>Place of Birth: {this.props.entry.POB}</p>
          <p>Year of Death: {this.props.entry.YOD}{this.props.entry.EOD}</p>
          <p>Place of Death: {this.props.entry.POD}</p>

          
        </div>
        : ''}
      </section>
     )
  }
 

}

export default Entry;