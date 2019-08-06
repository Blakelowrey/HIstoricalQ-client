import React from 'react';
import Entry from './entry.js'

class EntryList extends React.Component{
  
  

  render(){
    
    let myEntries = this.props.entries.map(entry => {
      return <Entry entry={entry}/>
    })
    return myEntries;



  }

}

export default EntryList;