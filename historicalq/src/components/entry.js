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
        <p>{this.props.entry.description}</p>
        {this.state.expanded?
        <div className='expanded-info'>
          <p>Year of Birth: {this.props.entry.yob}{this.props.entry.eob}</p>
          <p>Place of Birth: {this.props.entry.pob}</p>
          <p>Year of Death: {this.props.entry.yod}{this.props.entry.eod}</p>
          <p>Place of Death: {this.props.entry.pod}</p>

          
        </div>
        : ''}
      </section>
     )
  }
 

}

export default Entry;