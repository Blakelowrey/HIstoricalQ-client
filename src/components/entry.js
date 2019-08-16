import React from 'react';

class Entry extends React.Component {
  constructor(props){
    super(props);
    this.state = {expanded: false}
  }
  componentDidMount(){
    console.log();
  }
  render(){
    return(
      <section>
        <h3>{this.props.entry.name}</h3>
        <p>{this.props.entry.description}</p>
        {this.props.loggenIn ?
        <>
          {this.props.isFavorite
            ? 
              <button onClick={()=>this.props.deleteFavorite(this.props.entry.id)}>remove favorite</button>
            :
              <button onClick={()=>this.props.addFavorite({entryId : this.props.entry.id})}>Add To Favorites</button> }
        </>: ''}
        <button onClick={e=>{
          e.preventDefault();
          this.setState({expanded : !this.state.expanded});
        }}>
          expand info
        </button>
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