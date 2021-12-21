import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { fakeAuth } from "../../Auth";
import { DASHBOARD_URL } from "../../urls";
import "./style";
class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      emailValid: null,
      passwordValid: null,
      formValid: null
    };    
  }

   handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        let validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          value
        );
        this.setState({ emailValid: validEmail });
        break;
      case "password":
        let passValid = /^(.*[A-Z].*)$/.test(value);
        this.setState({ passwordValid: passValid });
        break;
      default:
        return "";
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    let getuser = this.props.getLogin().user[0];
     if (getuser.email === email && password === getuser.password) {
      fakeAuth.hasLogin = true;
      this.props.onSignIn(email, password);
      this.setState({ formValid: true });   
      this.props.history.push('/dashboard')
    } else {     
      this.setState({ formValid: false });
      this.errorClass(false);
    }   
  };

  errorClass = error => {
    if (error === null) return "";
    return error ? "" : "has-error";
  };

  render() {
    let chkEmail = this.state.emailValid;
    let chkPwd = this.state.passwordValid;
    let formValid = this.state.formValid;
    return (
      <div className="container">
        <form
          autoComplete="off"
          onSubmit={this.onSubmit}
          id="loginForm"
          className={`${this.errorClass(formValid)}`}
        >
          {!this.state.formValid && (
            <span className="form-error">email Or Password not matched</span>
          )}
          <div className={`form-group ${this.errorClass(chkEmail)}`}>
            <label htmlFor="email"> Email: </label>
            <input
              type="email"
              ref="email"
              name="email"
              onChange={this.handleChange}
              className="form-control"
              required
            />
            {!this.state.emailValid && (
              <span className="error-fields">
                email should be formatted( xxx@xxx.com )
              </span>
            )}
          </div>

          <div className={`form-group ${this.errorClass(chkPwd)}`}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              ref="password"
              name="password"
              required
              className="form-control"
              onChange={this.handleChange}
            />
            {!this.state.passwordValid && (
              <span className="error-fields">
                Password Should contains one captital Letter and number
              </span>
            )}
          </div>
          <div className="form-group">
            <input
              type="Submit"
              value="Login"
              className="btn btn-primary"
              onSubmit={this.onSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}
 export default LoginForm;
