import React from 'react';

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sortBy : 'alphabetical',
      era : 'all'
    };
  }
  componentWillMount() {
    this.props.clearEntries();
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    
    this.props.getSortEntries({sortBy: this.state.sortBy, era: this.state.era});

  };
  handleSortByChange = (event) => {
    this.setState({
      sortBy: event.target.value
    });
    
  };

  handleEraChange = (event) => {
    this.setState({
      era: event.target.value
    });
    
  };

  render(){

    return(
      <header role="banner">
        <h1>Search Parameters</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div>
          <h4>Sort By: </h4>
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
          </div>
          <div>
          <h4>Era: </h4>
          <label>
            <input
              type="radio"
              value="all"
              checked={this.state.era === "all"}
              onChange={this.handleEraChange}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              value="antiquity"
              checked={this.state.era === "antiquity"}
              onChange={this.handleEraChange}
            />
            antiquity
          </label>
          <label>
            <input
              type="radio"
              value="medieval"
              checked={this.state.era === "medieval"}
              onChange={this.handleEraChange}
            />
            Medieval
          </label>
          <label>
            <input
              type="radio"
              value="modern"
              checked={this.state.era === "modern"}
              onChange={this.handleEraChange}
            />
            Modern
          </label>
          </div>


          <button type='submit'>Search</button>
        </form>
        
      </header>

    );
  
  }
 



}
export default SearchForm;