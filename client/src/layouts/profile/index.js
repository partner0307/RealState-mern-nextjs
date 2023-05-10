/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import burceMars from 'assets/images/userimage.webp';

import { apiConstants } from '../../API/apiConstrants';
import { sweetalertsuccess, sweetalertwarning } from '../../helper/alert';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';

// Overview page components
import Header from 'layouts/profile/components/Header';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      firstName: localStorage.getItem('agentfirtsName'),
      currenyUserId: localStorage.getItem('currenyUserId'),
      employee_photo: localStorage.getItem('agentPhoto'),
      uploadImage: null,
      lastName: localStorage.getItem('agentlastName'),
      email: localStorage.getItem('agentemail'),
      address: localStorage.getItem('agentaddress'),
      contact: localStorage.getItem('agentcontact'),
      password: '',
      designation: localStorage.getItem('agentdesignation'),
      experience: localStorage.getItem('agentexperience'),
      sales: localStorage.getItem('agentsales'),
      specialities: localStorage.getItem('agentspecialities'),
      department: '',
      aboutyou: localStorage.getItem('agentaboutyou'),
      selectedphoto: [],
      photoUrl: burceMars
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      if (this.state.selectedphoto || this.state.employee_photo) {
        const data = new FormData();
        data.append('employee_photo', this.state.selectedphoto);
        axios.post(apiConstants.AGENT_PHOTA_UPLOAD, data).then((res) => {
          if (res.data.message === 'uploaded') {
            var photoname = this.state.selectedphoto.name;
          } else {
            photoname = this.state.employee_photo;
          }
          let method;
          method = 'PUT';
          let APIURL = apiConstants.USER_UPDATE_URL;
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          var body = JSON.stringify({
            id: this.state.currenyUserId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            employee_photo: photoname,
            email: this.state.email,
            address: this.state.address,
            contact: this.state.contact,
            password: this.state.password,
            designation: this.state.designation,
            experience: this.state.experience,
            sales: this.state.sales,
            specialities: this.state.specialities,
            aboutyou: this.state.aboutyou,
            authenticated: 'Yes'
          });
          // console.log(body);
          var requestOptions = {
            method: method,
            headers: myHeaders,
            body: body,
            redirect: 'follow'
          };
          fetch(APIURL, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .then(sweetalertsuccess('Profile updated succesfully'))
            .catch((error) => console.log('error', error));
        });
      } else {
        sweetalertwarning('Please upload  photo');
      }
    }
  };
  handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (this.validate()) {
      const data = new FormData();
      data.append('employee_photo', this.state.selectedphoto);
      await axios.post(apiConstants.AGENT_PHOTA_UPLOAD, data).then(() => {
        let method;
        method = 'PUT';
        let APIURL = apiConstants.EMPLOYEE_UPDATE_URL;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var body = JSON.stringify({
          id: this.props.id,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          employee_photo: this.state.selectedphoto.name,
          email: this.state.email,
          address: this.state.address,
          contact: this.state.contact,
          password: this.state.password,
          designation: this.state.designation,
          experience: this.state.experience,
          sales: this.state.sales,
          specialities: this.state.specialities,
          aboutyou: this.state.aboutyou
        });
        var requestOptions = {
          method: method,
          headers: myHeaders,
          body: body,
          redirect: 'follow'
        };
        fetch(APIURL, requestOptions)
          .then((response) => response.text())
          .then(() => this.setState({}))
          .then(sweetalertsuccess('Employee details updated succesfully'))
          .catch((error) => console.log('error', error));
      });
    }
  };
  validate = () => {
    let errors = {};
    let isValid = true;
    let passwordValidation = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    );
    if (!this.state.firstName) {
      isValid = false;
      errors['firstName'] = 'This field is required';
    }
    if (!this.state.lastName) {
      isValid = false;
      errors['lastName'] = 'This field is required';
    }
    if (!this.state.address) {
      isValid = false;
      errors['address'] = 'This field is required';
    }
    if (!this.state.contact) {
      isValid = false;
      errors['contact'] = 'This field is required';
    }

    if (!this.state.email) {
      isValid = false;
      errors['email'] = 'This field is required';
    }
    if (!this.state.password) {
      isValid = false;
      errors['password'] = 'This field is required';
    }
    if (!passwordValidation.test(this.state.password)) {
      isValid = false;
      sweetalertwarning(
        'Password should contain at least one letter, one number, and be at least 8 characters long'
      );
    }
    if (!this.state.designation) {
      isValid = false;
      errors['designation'] = 'This field is required';
    }
    if (!this.state.experience) {
      isValid = false;
      errors['experience'] = 'This field is required';
    }
    if (!this.state.sales) {
      isValid = false;
      errors['sales'] = 'This field is required';
    }
    if (!this.state.specialities) {
      isValid = false;
      errors['specialities'] = 'This field is required';
    }
    if (!this.state.aboutyou) {
      isValid = false;
      errors['aboutyou'] = 'This field is required';
    }
    if (!this.state.employee_photo) {
      isValid = false;
      errors['employee_photo'] = 'This field is required';
    }
    this.setState({
      errors: errors
    });
    return isValid;
  };
  handleImageChange = async (e) => {
    // eslint-disable-next-line no-useless-escape
    let imageNameValidation = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    this.setState({ uploadImage: e.target.files[0].name });
    if (imageNameValidation.test(e.target.files[0].name.slice(0, -4))) {
      sweetalertwarning('Update image name without special character and upload again');
      return;
    }
    this.setState({ employee_photo: [] });
    this.setState({ selectedphoto: [] });

    if (this.checkMimeType(e)) {
      await this.setState({ selectedphoto: e.target.files[0] }, async () =>
        this.setState({ employee_photo: e.target.files[0] })
      );

      if (this.state.selectedphoto) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          await this.setState({ photoUrl: event.target.result });
        };
        reader.readAsDataURL(new Blob([this.state.selectedphoto]));
      }
    }
  };

  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = '';
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + ' is not a supported format\n';
      }
    }
    if (err !== '') {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      // setimagemessage(err);
      return false;
    }
    return true;
  };
  render() {
    if (!localStorage.getItem('jwtToken')) {
      return <Navigate to="/authentication/sign-in" />;
    }

    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header>
          <MDBox p={2}>
            <MDBox
              container
              spacing={2}
              mt={5}
              mb={3}
              component="form"
              role="form"
              onSubmit={this.handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6} xl={4}>
                  <MDTypography variant="h6" fontWeight="medium">
                    About Me
                  </MDTypography>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.firstName}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="firstName"
                      onChange={this.handleChange}
                      value={this.state.firstName ? this.state.firstName : ''}
                      label="First Name"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.lastName}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="lastName"
                      onChange={this.handleChange}
                      value={this.state.lastName ? this.state.lastName : ''}
                      label="Last Name"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.address}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="address"
                      onChange={this.handleChange}
                      value={this.state.address ? this.state.address : ''}
                      label="Address"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.contact}
                    </MDTypography>
                    <MDInput
                      type="number"
                      name="contact"
                      onChange={this.handleChange}
                      value={this.state.contact ? this.state.contact : ''}
                      label="Contact No."
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.email}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email ? this.state.email : ''}
                      label="Email"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <MDTypography variant="h6" fontWeight="medium">
                    ‏‏‎ ‎
                  </MDTypography>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.password}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                      label="Password"
                      fullWidth
                    />
                  </MDBox>

                  <DefaultProjectCard image={this.state.photoUrl} action={{}} />
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.employee_photo}
                    </MDTypography>
                    <MDInput
                      type="file"
                      name="employee_photo"
                      onChange={this.handleImageChange}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Professional Info
                  </MDTypography>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.designation}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="designation"
                      onChange={this.handleChange}
                      value={this.state.designation ? this.state.designation : ''}
                      label="Designation"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.experience}
                    </MDTypography>
                    <MDInput
                      type="textarea"
                      name="experience"
                      onChange={this.handleChange}
                      value={this.state.experience ? this.state.experience : ''}
                      label="Experience"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.sales}
                    </MDTypography>
                    <MDInput
                      type="number"
                      name="sales"
                      onChange={this.handleChange}
                      value={this.state.sales ? this.state.sales : ''}
                      label="Sales"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.specialities}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="specialities"
                      onChange={this.handleChange}
                      value={this.state.specialities ? this.state.specialities : ''}
                      label="Specialities"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.aboutyou}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="aboutyou"
                      onChange={this.handleChange}
                      value={this.state.aboutyou ? this.state.aboutyou : ''}
                      label="About you"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton type="submit" variant="gradient" color="info" fullWidth>
                      Save
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Header>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default Overview;
