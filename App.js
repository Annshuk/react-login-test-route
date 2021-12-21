import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { HOME_URL, LOGIN_URL, DASHBOARD_URL } from './urls';
import { fakeAuth } from './Auth';
import LoginForm from './Login/Components';
import Dashboard from './Dashboard';

import {
  getProducts,
  getUser,
  getLogout,
  removeProductItem,
  addProductItem,
} from './services';

import 'bootstrap/dist/css/bootstrap.min.css';

const userData = JSON.parse(sessionStorage.getItem('users'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  isLogged = (flag) => flag;

  componentDidMount() {
    let isActive = JSON.parse(sessionStorage.getItem('users'));
    if (isActive) {
      fakeAuth.hasLogin = true;
      this.props.getUser();
      this.props.getProducts();
      this.isLogged(fakeAuth.hasLogin);
    }
  }

  signIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
      },
    });
    var user = { email, password };
    sessionStorage.setItem('users', JSON.stringify(user));
    fakeAuth.hasLogin = true;
    this.props.getUser();
    this.props.getProducts();
  };

  signOut = () => {
    this.setState({ user: null });
    this.props.logout();
    sessionStorage.clear();
    fakeAuth.hasLogin = false;
  };

  handleDelete = (id) => {
    this.props.removeProductItem(id);
  };

  handleAddItem = (data) => {
    this.props.addProductItem(data);
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path={LOGIN_URL}
          render={(props) => (
            <LoginForm
              isLogin={this.isLogged}
              onSignIn={this.signIn}
              getLogin={this.props.getUser}
              {...props}
            />
          )}
        />
        {fakeAuth.hasLogin && (
          <Route
            exact
            path={DASHBOARD_URL}
            render={(props) => (
              <Dashboard
                routProps={props}
                products={this.props.dashboard}
                user={userData}
                handleDelete={this.handleDelete}
                handleAddItem={this.handleAddItem}
                onSignOut={this.signOut}
                {...props}
              />
            )}
          />
        )}
      </Switch>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getUser: () => dispatch(getUser()),
    signOut: () => dispatch(signOut()),
    removeProductItem: (id) => dispatch(removeProductItem(id)),
    addProductItem: (data) => dispatch(addProductItem(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.Dashboard,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
