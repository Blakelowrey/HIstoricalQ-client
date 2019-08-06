import React from 'react';

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sortBy : 'alphabetical'
    };
  }
  componentDidMount(){
    this.props.getSortEntries({sortBy: this.state.sortBy});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.getSortEntries({sortBy: this.state.sortBy});

  };
  handleSortByChange = (event) => {
    this.setState({
      sortBy: event.target.value
    });
    
  };

  render(){

    return(
      <header role="banner">
        <h1>Search Parameters</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            <input
              type="radio"
              value="alphabetical"
              checked={this.state.sortBy === "alphabetical"}
              onChange={this.handleSortByChange}
            />
            alphabetical
          </label>
          <label>
            <input
              type="radio"
              value="YOB"
              checked={this.state.sortBy === "YOB"}
              onChange={this.handleSortByChange}
            />
            year of birth
          </label>
        
          <button type='submit'>Submit</button>
        </form>
        <p>here will lie the search entry form</p>
      </header>
    );
  
  }
 



}
export default SearchForm;