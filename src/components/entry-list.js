import React from 'react';
import Entry from './entry.js'

class EntryList extends React.Component{
 componentWillMount(){
   if(this.props.loggenIn){
     console.log('hello');
    this.props.getFavoritesIds();
   }
   
 }
  

  render(){
    console.log(this.props.loggenIn);
    let myEntries = this.props.entries.map((entry, index) => {
      let isFavorite = false;
      for (let i = 0 ; i < this.props.favoritesIds.length ; i++){
        if (this.props.favoritesIds[i] === entry.id){
          isFavorite = true
        }
      }
      return <Entry isFavorite={isFavorite} loggenIn={this.props.loggenIn} deleteFavorite={this.props.deleteFavorite} addFavorite={this.props.addFavorite} entry={entry} key={index}/>
    });
    return myEntries;



  }

}

export default EntryList;