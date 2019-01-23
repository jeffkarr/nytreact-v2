import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import {
  ArticleList,
  ArticleListItem,
  SavedArticleListItem
} from "../../components/ArticleList";
import { Input, FormBtn } from "../../components/Form";
import Navigation from "../../components/Navigation";

class Articles extends Component {
  // setting intial state.
  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    savedArticles: [],
    userLoggedIn: false,
    user: null
  };

  componentDidMount() {
    this.getArticles(this.state.user);
  }

  scrapeArticles = searchParms => {
    API.getNyTimes(searchParms)
      .then(res =>
        this.setState(
          {
            articles: res.data.response.docs,
            topic: "",
            startYear: "",
            endYear: ""
          },
          function() {}
        )
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.getArticles())
      .catch(err => console.log(err));
  };

  getArticles = (userEmail) => {
    API.getArticles(userEmail)
      .then(res => this.setState({ savedArticles: res.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleClear = event => {
    event.preventDefault();
    this.setState({
      articles: []
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const searchParms = this.buildSearchParms();
    this.scrapeArticles(searchParms);
  };

  buildSearchParms = () => {
    let searchCriteria = "";
    const searchTopic = this.state.topic;
    searchCriteria += "&q=" + searchTopic;

    const startYear = this.state.startYear;

    if (parseInt(startYear, 4)) {
      searchCriteria += "&begin_date=" + startYear + "0101";
    }

    let endYear = this.state.endYear;

    if (parseInt(endYear, 4)) {
      searchCriteria += "&end_date=" + endYear + "1231";
    }
    return searchCriteria;
  };

  handleSaveArticle = index => {
    if (this.state.articles[index].headline.main) {
      API.saveArticle({
        user: this.state.user,
        title: this.state.articles[index].headline.main,
        byline: this.state.articles[index].byline.original,
        date: this.state.articles[index].pub_date,
        url: this.state.articles[index].web_url
      })
        .then(res => this.getArticles(this.state.user))
        .catch(err => console.log(err));
    }
  };

  handleIsUserVerfied(userParm, user) {
    this.setState(
      {
        userLoggedIn: userParm,
        user: user
      },
      function() {
        this.getArticles(this.state.user);
      }
    );
    this.forceUpdate();
  }

  render() {
    return (
      <Container fluid>
        <Navigation isUserVerified={this.handleIsUserVerfied.bind(this)} />
        <Container>
          <Row>
            <Col size="md-12">
              <Jumbotron loggedInProp={this.state.userLoggedIn}/>
              <div className="panel panel-primary text-center">
                <div className="panel-heading">
                  <h3 className="panel-title pr-5 py-3">
                    <i className="fa fa-list-alt" /> Search Filter
                  </h3>
                </div>
                <div className="panel-body col-md-12">
                  <form>
                    <Row>
                      <div className="col-md-6 mr-0 pr-1">
                        Topic
                        <Input
                          id="search-term"
                          name="topic"
                          value={this.state.topic}
                          onChange={this.handleInputChange}
                          placeholder="Topic (required)"
                        />
                      </div>
                      <div className="col-md-2 mx-0 px-1">
                        Start Year
                        <Input
                          id="start-year"
                          name="startYear"
                          value={this.state.startYear}
                          onChange={this.handleInputChange}
                          placeholder="Start year (required)"
                        />
                      </div>
                      <div className="col-md-2 mx-0 px-1">
                        End Year
                        <Input
                          id="end-year"
                          name="endYear"
                          value={this.state.endYear}
                          onChange={this.handleInputChange}
                          placeholder="End year (required)"
                        />
                      </div>
                      <div className="col-md-2 pl-5 pt-3">
                        <FormBtn
                          onClick={this.handleFormSubmit}
                          className="btn-lg mb-5"
                        >
                          <i className="fa fa-search mr-2" />
                          Search
                        </FormBtn>
                      </div>
                    </Row>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
          <div className="search-results-bar panel-heading align-middle">
            <Row>
              <div className="col-md-4" />
              <div className="col-md-6">
                <h3>
                  <i className="fa fa-list-alt pl-5 pt-4" /> Search Results
                </h3>
              </div>
              <div className="col-md-2 text-center pr-4 pt-3">
                <FormBtn onClick={this.handleClear} className="btn-lg mt-5">
                  <i className="fa fa-trash mr-2" />
                  Clear
                </FormBtn>
              </div>
            </Row>
          </div>
          <Row>
            <Col size="md-12">
              {this.state.articles.length ? (
                <ArticleList>
                  {this.state.articles.map((article, index) => (
                    <ArticleListItem
                      key={article._id}
                      headline={article.headline.main}
                      href={article.web_url}
                      byline={article.byline.original}
                      date={article.pub_date}
                      onClick={() => this.handleSaveArticle(index)}
                    />
                  ))}
                </ArticleList>
              ) : (
                <h5 className="text-center py-3">No Articles to Display</h5>
              )}
            </Col>
          </Row>
          {this.state.userLoggedIn === false ? (
            <div />
          ) : (
            <div className="saved-articles-bar panel-heading align-middle">
              <Row>
                <Col size="md-4" />
                <Col size="md-4" className="text-center">
                  <h3>
                    <i className="fa fa-list-alt pt-4 pb-2 pl-5" /> Saved
                    Articles
                  </h3>
                </Col>
                <Col size="md-4" />
              </Row>
            </div>
          )}
          {this.state.userLoggedIn === false ? (
            <div />
          ) : (
            <Row>
              <Col size="md-12">
                {this.state.savedArticles.length ? (
                  <ArticleList>
                    {this.state.savedArticles.map((savedArticle, index) => (
                      <SavedArticleListItem
                        key={savedArticle._id}
                        headline={savedArticle.title}
                        href={savedArticle.url}
                        byline={savedArticle.byline}
                        date={savedArticle.date}
                        onClick={() => this.deleteArticle(savedArticle._id)}
                      />
                    ))}
                  </ArticleList>
                ) : (
                  <h5 className="text-center py-3">
                    No Saved Articles to Display
                  </h5>
                )}
              </Col>
            </Row>
          )}
        </Container>
      </Container>
    );
  }
}

export default Articles;
