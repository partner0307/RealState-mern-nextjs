/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

function Footer() {
  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: 'column', lg: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    />
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: '#', name: 'PC Patel Infra Pvt Ltd' },
  links: [
    { href: '#', name: 'PC Patel Infra Pvt Ltd' },
    { href: '#', name: 'About Us' },
    { href: '#', name: 'Blog' },
    { href: '#', name: 'License' }
  ]
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object)
};

export default Footer;
