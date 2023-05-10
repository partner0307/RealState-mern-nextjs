/* eslint-disable no-unused-vars */
import { useState } from 'react';

// react-router-dom components
import { Link, useNavigate } from 'react-router-dom';

// @mui material components
import { Card, Grid } from '@mui/material';
import MuiLink from '@mui/material/Link';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import { sweetalertwarning } from '../../../helper/alert';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';

// Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { apiConstants } from '../../../API/apiConstrants';

function Basic() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      let isValid = true;
      let method;
      method = 'POST';
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var body = JSON.stringify({
        username: username,
        password: password
      });
      var requestOptions = {
        method: method,
        headers: myHeaders,
        body: body
      };
      fetch(apiConstants.LOGIN_API, requestOptions).then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            // console.log(json);
            // console.log(json.message);
            if (json.message === 'Logged in successful') {
              isValid = false;
              await localStorage.setItem('jwtToken', json.accessToken);
              await localStorage.setItem('currenyUserId', json.userid);
              await localStorage.setItem('currentusertype', json.usertype);
              await localStorage.setItem('agentfirtsName', json.data.firstName);
              await localStorage.setItem('agentlastName', json.data.lastName);
              await localStorage.setItem('agentaddress', json.data.address);
              await localStorage.setItem('agentcontact', json.data.contact);
              await localStorage.setItem('agentemail', json.data.email);
              await localStorage.setItem('agentdesignation', json.data.designation);
              await localStorage.setItem('agentexperience', json.data.experience);
              await localStorage.setItem('agentsales', json.data.sales);
              await localStorage.setItem('agentspecialities', json.data.specialities);
              await localStorage.setItem('agentaboutyou', json.data.aboutyou);
              await localStorage.setItem('agentPhoto', json.data.employee_photo);

              if (localStorage.getItem('currentusertype') == 'superadmin') {
                navigate('/dashboard');
                // window.location.reload();
              } else {
                navigate('/dashboard');
              }
              // window.location.href = apiConstants.HOMEPAGE;
            }
            if (json.message === 'failed') {
              sweetalertwarning('Username or password not correct.');
            }
            if (json.message === 'unauthenticated') {
              sweetalertwarning('Wait some time admin will authenticate you, try again later..');
            }
            if (json.message === 'usernamenotexist') {
              sweetalertwarning('Username does not exist');
            }
          });
        }
      });
    }
  };

  const validate = () => {
    let isValid = true;
    if (!username && !password) {
      sweetalertwarning('Username & Password required');
    }
    if (!username) {
      isValid = false;
      sweetalertwarning('Username required');
    }
    if (!password) {
      isValid = false;
      sweetalertwarning('Password required');
    }
    return isValid;
  };
  return (
    // bgImage
    <BasicLayout image={''}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center">
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" onSubmit={handleSubmit} role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                label="Username"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                label="Password"
                // required
                // inputProps={{
                //   minLength: 7,
                //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/  //Password should contain at least one letter, one number, and be at least 8 characters long
                // }}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <MDBox mt={0} mb={0} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/authentication/reset-password"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient>
                    &nbsp;&nbsp;&nbsp;Forgot password
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient>
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
