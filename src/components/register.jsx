import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import * as userService from '../services/userService';
import auth from '../services/authService';
class Register extends Form {
  state = {
    data: { name: '', password: '', email: '' },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label('Username').min(6).max(50),
    password: Joi.string().required().label('Password').min(6).max(50),
    email: Joi.string().required().label('Email').min(6).max(50).email(),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJWT('token', response.headers['x-auth-token']);
      console.log('response', response);
      window.location = '/';
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('email', 'Email')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default Register;
