import React from 'react';
import Entry from './entry.js'
import config from '../config.js';

class EntryList extends React.Component{
 componentWillMount(){
   if(this.props.loggenIn){
     console.log('hello');
    this.getFavoritesIds();
   }
   
 }
 getFavoritesIds = () => {
  const jwt = window.localStorage.getItem(config.TOKEN_KEY);
  fetch(`${config.API_ENDPOINT}/users/favorites/arr`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization' : `bearer ${jwt}`
    }
  }).then(res => res.json()).then(data =>{
      const {message} = data;
      if(!message){
        console.log(data);
        let ids = [];
        data.forEach(item => ids.push(item.entry_ref))
        console.log(ids);
        this.props.setAppState({favoritesIds : ids});
      }
  });

}
 deleteFavorite = (entry_ref) => {
  let params = {entry_ref};
  const jwt = window.localStorage.getItem(config.TOKEN_KEY);
  fetch(`${config.API_ENDPOINT}/users/favorites`, {
    method: 'delete',
    headers: {
      'content-type': 'application/json',
      'Authorization' : `bearer ${jwt}`
    },
    body: JSON.stringify(params)})
    .then(res => res.json())
    .then(data=>{
      console.log(data);
      let favoritesIdsCopy = [...this.props.favoritesIds];
      favoritesIdsCopy = favoritesIdsCopy.filter(id => {
        return (id !== entry_ref);
      });
      this.props.setAppState({favoritesIds : favoritesIdsCopy})
    })
}
  
 addFavorite=(params={})=>{
  console.log(params);
  const jwt = window.localStorage.getItem(config.TOKEN_KEY);
  fetch(`${config.API_ENDPOINT}/users/favorites`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization' : `bearer ${jwt}`
    },
    body: JSON.stringify(params)
  })
  .then(res=>res.json())
  .then(data => {
    console.log(data);
    let favoritesIdsCopy = [...this.props.favoritesIds];
      favoritesIdsCopy.push(params.entryId)
      this.props.setAppState({favoritesIds : favoritesIdsCopy})
  });

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
      return <Entry isFavorite={isFavorite} loggenIn={this.props.loggenIn} deleteFavorite={this.deleteFavorite} addFavorite={this.addFavorite} entry={entry} key={index}/>
    });
    return myEntries;



  }

}

export default EntryList;