import axios from "axios";

export default {
  // Scrape the NYTimes website for articles that are within the searchParms
  getNyTimes: function (searchParms) {
    let apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + 
    process.env.REACT_APP_NYT_API_KEY + 
    searchParms;

    return axios.get(
      apiUrl + 
      searchParms, 
      {
      paramsSerializer: function (params) {
        var result = searchParms;
        return result;
        }
      }
    );
  },
  // Gets all saved articles from the database
  getArticles: function (userEmail) {
    return axios.get("/api/articles/" + userEmail);
  },
  // Deletes the saved article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a scraped article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  },
  // Saves a new user 
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  // Searchs for a login user  
  getUser: function (userEmail) {
    return axios.get("api/users/" + userEmail);
  }
};






