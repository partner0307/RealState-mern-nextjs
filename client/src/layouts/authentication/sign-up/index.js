// react-router-dom components
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { apiConstants } from '../../../API/apiConstrants';
import { sweetalertsuccess, sweetalertwarning } from '../../../helper/alert';

// @mui material components
import { Card, Checkbox } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout';

class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      contact: '',
      email: '',
      authenticated: 'No',
      userType: 'Agent',
      password: '',
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log('input event', event.target.value);
    console.log('password input event', this.state.password);
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value === 'Agent') {
      // console.log(event.target.value);
      this.setState({ userType: 'Admin' });
    } else {
      this.setState({ userType: 'Agent' });
      // console.log(event.target.value);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validate()) {
      let method;
      method = 'POST';
      let APIURL = apiConstants.REGISTRATION_URL;
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      var body = JSON.stringify({
        firstName: this.state.firstName,
        contact: this.state.contact,
        email: this.state.email,
        userType: this.state.userType,
        username: this.state.username,
        password: this.state.password,
        authenticated: this.state.authenticated
      });
      // alert(body);
      var requestOptions = {
        method: method,
        headers: myHeaders,
        body: body,
        redirect: 'follow'
      };

      fetch(APIURL, requestOptions)
        .then((response) => response.text())
        .then(() =>
          this.setState({
            firstName: '',
            contact: '',
            email: '',
            authenticated: 'No',
            userType: 'Agent',
            password: '',
            username: ''
          })
        )
        .then(sweetalertsuccess('Registered succesfully'))
        .catch((error) => console.log('error', error));
    }
  };
  validate = () => {
    let isValid = true;
    let passwordValidation = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    );

    if (!this.state.password) {
      isValid = false;
      sweetalertwarning('Password is required');
    }
    if (!passwordValidation.test(this.state.password)) {
      isValid = false;
      sweetalertwarning(
        'Password should contain at least one letter, one number, and be at least 8 characters long'
      );
    }
    if (!this.state.username) {
      isValid = false;
      sweetalertwarning('Username is required');
    }
    if (!this.state.email) {
      isValid = false;
      sweetalertwarning('Email is required');
    }
    if (!this.state.contact) {
      isValid = false;
      sweetalertwarning('Contact is required');
    }
    if (!this.state.firstName) {
      isValid = false;
      sweetalertwarning('First name is required');
    }
    return isValid;
  };
  render() {
    return (
      // bgImage
      <CoverLayout image={''}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center">
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Join us today
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your few details to register
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={this.handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  label="First Name *"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  name="contact"
                  onChange={this.handleChange}
                  value={this.state.contact}
                  label="Contact *"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  label="Email *"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                  label="Username *"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  label="Password *"
                  variant="standard"
                  required
                  fullWidth
                />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox
                  name="userType"
                  onChange={this.handleChange}
                  value={this.state.userType}
                />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: 'pointer', ml: -1 }}>
                  &nbsp;&nbsp;Do you want register as admin&nbsp;
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  sign in
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{' '}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient>
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    );
  }
}

export default Cover;
