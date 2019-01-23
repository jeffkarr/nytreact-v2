import React from "react";
import "./Jumbotron.css";

class Jumbotron extends React.Component {
  render() {

    return <div className="jumbotron text-center mt-3 mb-3">
        <h1 className="text-center">
          <strong>
            <i className="fa fa-newspaper-o mr-3" />
            New York Times Search
          </strong>
        </h1>
        {this.props.loggedInProp === "true" ? 
          <h3 className="text-center mt-4" id="h3-color-logged-in">
            <em>Scroll down to view your saved articles !</em>
          </h3> : <h3 className="text-center mt-4">
            <em>Search for articles of your interest !</em>
          </h3>}
      </div>;
  }
};

export default Jumbotron;
