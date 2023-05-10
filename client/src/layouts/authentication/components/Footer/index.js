import PropTypes from 'prop-types';
// @mui material components
import Container from '@mui/material/Container';
// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
// Material Dashboard 2 React base styles
function Footer() {
  return (
    <MDBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        />
      </Container>
    </MDBox>
  );
}

// Setting default props for the Footer
Footer.defaultProps = {
  light: false
};

// Typechecking props for the Footer
Footer.propTypes = {
  light: PropTypes.bool
};

export default Footer;
