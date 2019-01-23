import React from "react";
import "./Search.css";
import Input from "../Input";

const Search = (props) => (
  <div className="panel text-center">
    <div className="panel-heading">
      <h3 className="panel-title">
        <i className="fa fa-list-alt"></i> Search
      </h3>
    </div>
    <div className="panel-body">
      <form>
          Topic<Input id="search-term"
            value={this.state.topic}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Article search topic (required)" 
          />
          Start Year<Input id="start-year"/> 
          End Year<Input id="end-year"/>
        <button type="submit" className="btn btn-default btn-lg m-4" id="run-search">
          <i className="fa fa-search"></i> Search</button>
        <button type="button" class="btn btn-default btn-lg m-4" id="clear-all">
          <i class="fa fa-trash"></i> Clear Results</button>
      </form>
    </div>
  </div>
    );
    
  export default Search;
