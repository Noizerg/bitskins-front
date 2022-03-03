import React, { Component } from 'react';
import authService, { login } from '../services/authService';
import { Redirect } from 'react-router-dom';

import Joi from 'joi-browser';
import Form from './common/form';
class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username').min(6).max(50),
    password: Joi.string().required().label('Password').min(6).max(50),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await login(username, password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (er) {
      if (er.response && er.response.status === 400) {
        const errors = { password: er.response.data };
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
