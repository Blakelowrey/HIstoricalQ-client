import React from 'react';
import Entry from './entry.js'

class EntryList extends React.Component{
  
  

  render(){
    
    let myEntries = this.props.entries.map((entry, index) => {
      return <Entry entry={entry} key={index}/>
    });
    return myEntries;



  }

}

export default EntryList;