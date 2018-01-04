/**
 * Component handles the registration of a new user
 */
import React, { Component } from 'react';
import _ from 'lodash';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { registerUser, clearMessages } from '../actions';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const FIELDS = ['firstname', 'lastname', 'username', 'password', 'cpassword', 'email'];

/**
 * function renders a given field into the form
 * @param {object} field - field to be rendered
 */
function renderField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group row ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <label>{field.label}</label>
      <input
        className="form-control"
        type={field.type}
        {...field.input}
      />
      <div className="form-control-feedback">
        {touched ? error : ''}
      </div>
    </div>
  );
}
export class RegisterUser extends Component {

  /**
   * function executed when form is submitted
   * @param {object} values - values entered into the from
   */
  onSubmit(values) {
    // Dispatch action to register a user
    this.props.registerUser(values, () => {this.notify_sucess("Successfully Registered");});
  }
  
  /**
   * function toasts a success message
   */
  notify_sucess = (msg) => {
    toast.success(msg, {onClose: () => {this.props.history.push('/')}});
  }

  /**
   * function toasts an errror message
   */
  notify_error = (msg) => {
    toast.error(msg)
  }
  render() {
    // Show loading incase action is not yet resolved
    if (!this.props.auth.loaded) {
      return <div>Loading...</div>;
    }
    // if the user is already authenticated redirect user to the home page
    if (this.props.auth.Authenticated) {
      return <Redirect to="/" />;
    }
    // Incase of an error toast an error message
    if(this.props.auth.error) {
      this.notify_error(this.props.auth.error_msg);
      this.props.clearMessages();
    }
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <ToastContainer />
        <h3> Register </h3>
        <br />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="First Name"
            name="firstname"
            type="input"
            component={renderField}
          />
          <Field
            label="Last Name"
            name="lastname"
            type="input"
            component={renderField}
          />
          <Field
            label="Username"
            name="username"
            typoe="input"
            component={renderField}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            component={renderField}
          />
          <Field
            label="Confirm Password"
            name="cpassword"
            type="password"
            component={renderField}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            component={renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

/**
 * Function validates form inputs
 * @param {object} values - values entered into the form
 */
function validate(values) {
  const errors = {};
  // validating the inputs from 'values'
  _.forEach(FIELDS, (field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });
  if (!values.cpassword) {
    errors.cpassword = 'Confirm password';
  }
  if (values.password !== values.cpassword) {
    errors.cpassword = 'Passwords do not match';
  }
  if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  return errors;
}

/**
 * function maps component props props to application state
 * @param {state} - Application state 
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

// export the connected reduxForm as the default
export default reduxForm({
  validate,
  form: 'RegisterForm'
})(connect(mapStateToProps, { registerUser, clearMessages })(RegisterUser));
