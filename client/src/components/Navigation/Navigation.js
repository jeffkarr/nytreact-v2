import React, { Component } from "react";
import "./Navigation.css";
import API from "../../utils/API";

const NavItem = props => {
  const pageURI = window.location.pathname + window.location.search;
  const liClassName = props.path === pageURI ? "nav-item active" : "nav-item";
  const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
  return (
    <li className={liClassName}>
      <a href={props.path} className={aClassName}>
        {props.name}
        {props.path === pageURI ? (
          <span className="sr-only">(current)</span>
        ) : (
          ""
        )}
      </a>
    </li>
  );
};

class NavDropdown extends Component {
  constructor() {
    super();
    this.state = {
      isToggleOn: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.handleDropdownToggle();
  }
  showDropdown(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  handleDropdownToggle() {
      this.setState({ isToggleOn: false })
  }

  render() {
    let classDropdownMenu =
      "dropdown-menu" + (this.state.isToggleOn ? " show" : "");
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={e => {
            this.showDropdown(e);
          }} >
          {this.props.name}
        </a>
        <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
          {this.props.children}
        </div>
      </li>
    );
  }
}

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      loginObj: {},
      createAcctObj: {},
      userVerified: false
    };
  }
  handleLogin = event => {
    event.preventDefault();
    // checks to ensure all fields are populated on form.
    if(this.refs.loginEmail.value === "") {
      alert("Email is required!")
    };
    if(this.refs.loginPassWord.value === "") {
      alert("Password is required!")
    }
    // if form is in good order, add login values to state then get user record.
    if(this.refs.loginEmail.value !== "" && this.refs.loginPassWord.value !== "") {
      this.setState({
          loginObj: {
            loginEmail: this.refs.loginEmail.value,
            loginPassWord: this.refs.loginPassWord.value
          }
      }, function() {
        API.getUser(this.state.loginObj.loginEmail)
          .then(res => {
            this.validateUserLogin(res)
            this.refs.loginEmail.value = "";
            this.refs.loginPassWord.value = "";
          })
          .catch(err => console.log(err));
      });
    };
  };

  validateUserLogin(getUserResponse) {
    if (this.state.loginObj.loginEmail === getUserResponse.data[0].userEmail &&
      this.state.loginObj.loginPassWord === getUserResponse.data[0].userPassWord) {
      this.setState({ userVerified: "true" }, function () {
        this.props.isUserVerified(this.state.userVerified, this.state.loginObj.loginEmail);
      });
    } else if (this.state.createAcctObj.userEmail === getUserResponse.data[0].userEmail &&
        this.state.createAcctObj.userPassWord === getUserResponse.data[0].userPassWord) {
        this.setState({ userVerified: "true" }, function () {
          this.props.isUserVerified(this.state.userVerified, this.state.createAcctObj.userEmail);
      });
    };
  };

  handleCreateAcct = event => {
    event.preventDefault();
    // checks to ensure all fields on form are populated.
    if (this.refs.createAcctEmail.value === "") {
      alert("Email is required!")
    };
    if (this.refs.createAcctPassWord.value === "") {
      alert("Password is required!")
    }
    // if form is in good order, create new user, add values to state then get user record.
    if (this.refs.createAcctEmail.value !== "" && this.refs.createAcctPassWord.value !== "") {
      this.setState({
        createAcctObj: {
          userEmail: this.refs.createAcctEmail.value,
          userPassWord: this.refs.createAcctPassWord.value
        }
      }, function () {
        API.saveUser(this.state.createAcctObj)
          .then(res => {
            API.getUser(this.state.createAcctObj.userEmail)
              .then(getUserRes => {
                this.validateUserLogin(getUserRes)
                this.refs.createAcctEmail.value = "";
                this.refs.createAcctPassWord.value = "";
              })
              .catch(err => console.log(err));
          }) 
          .catch(err => console.log(err));
      });
    };
  };

  render() {
    return (
      <nav className="navbar navbar-fluid navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavDropdown name="Login"
             toggleOff={this.state.userVerified}>
              <form className="px-2 py-3" onSubmit={this.handleLogin}>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" ref="loginEmail"
                    placeholder="email@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassWord">Password</label>
                  <input type="password" className="form-control" ref="loginPassWord" 
                    placeholder="Password" />
                </div>
                <input type="submit" value="Submit" className="btn btn-light" />
              </form>
            </NavDropdown>  
            <NavDropdown name="Create Account">
              <form className="px-2 py-3" onSubmit={this.handleCreateAcct}>
                <div className="form-group">
                  <label htmlFor="createAcctEmail">Email address</label>
                  <input type="email" className="form-control" ref="createAcctEmail"
                    placeholder="email@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="createAcctPassWord">Password</label>
                  <input type="password" className="form-control"
                    ref="createAcctPassWord" placeholder="Password" />
                </div>
                <input type="submit" value="Submit" className="btn btn-light" />
              </form>
            </NavDropdown> 
            {this.state.userVerified === false ? (
              <h5 className="ml-5 py-2"><i>Login to access your saved articles !</i></h5> 
              ) : (
                <h5 className="ml-5 py-2"><i>Welcome {this.state.loginObj.loginEmail || this.state.createAcctObj.userEmail} !</i></h5>     
              )
            }     
          </ul>
          <ul className="list-inline">
            <NavItem path="/" name="Sign Out" />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
