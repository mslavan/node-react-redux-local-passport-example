import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm.js';
import { bindActionCreators } from 'redux';
import * as pageActions from '../redux/actions/PageActions'
import { connect } from 'react-redux'
import axios from 'axios'

class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }


  processForm(event) {
    event.preventDefault();

    const { email, password } = this.state.user;

    axios.post('/auth/signin', {
      email,
      password
    })
    .then( res => {
      if (res.data.success === true) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // update authenticated state
        this.props.pageActions.loginUser(res.data.token);

        // redirect signed in user to dashboard
        this.props.history.push('/dashboard');        
      } else {
        // failure

        // change the component state
        const errors = res.data.errors ? res.data.errors : {};
        errors.summary = res.data.message;

        this.setState({
          errors
        });        
      }

    })

  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
  }
}

const mapStateToProps = ({ profile }) => ({
  profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);