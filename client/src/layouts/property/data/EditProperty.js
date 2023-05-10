/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// @mui material components
import Icon from '@mui/material/Icon';
// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
// Material Dashboard 2 React context
import { Modal } from '@material-ui/core';
import EdirProperty from 'layouts/addproperty/EdirProperty';
function Bill({
  id,
  address,
  locality,
  street,
  state,
  city,
  zipcode,
  featuredProperty,
  propertyFor,
  propertyType,
  thePrice,
  securityDeposit,
  beds,
  baths,
  kitchenSize,
  buildupArea,
  leaseDuration,
  serventQuarters,
  calling,
  appliances,
  floorSize,
  flooringType,
  dateAvailable,
  propertyDesc,
  accomodation,
  plotSize,
  yourBuilt,
  parking,
  services,
  nearBylocality,
  propertyImages
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!localStorage.getItem('jwtToken')) {
    navigate('/authentication/sign-in');
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MDBox>
        <MDButton onClick={handleOpen} variant="text" color="error">
          <Icon>edit</Icon>&nbsp;Edit
        </MDButton>
      </MDBox>

      <MDBox sx={{ border: 1 }}>
        <Modal className="rediousModel" open={open} onClose={handleClose}>
          <MDBox
            sx={{
              top: '50%',
              left: '50%',
              height: '60%',
              width: '80%',
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              overflow: 'scroll'
            }}>
            <EdirProperty
              data={'test'}
              id={id}
              address={address}
              locality={locality}
              street={street}
              state={state}
              city={city}
              zipcode={zipcode}
              featuredProperty={featuredProperty}
              propertyFor={propertyFor}
              propertyType={propertyType}
              thePrice={thePrice}
              securityDeposit={securityDeposit}
              beds={beds}
              baths={baths}
              kitchenSize={kitchenSize}
              buildupArea={buildupArea}
              leaseDuration={leaseDuration}
              serventQuarters={serventQuarters}
              calling={calling}
              appliances={appliances}
              floorSize={floorSize}
              flooringType={flooringType}
              dateAvailable={dateAvailable}
              propertyDesc={propertyDesc}
              accomodation={accomodation}
              plotSize={plotSize}
              yourBuilt={yourBuilt}
              parking={parking}
              services={services}
              nearBylocality={nearBylocality}
              propertyImages={propertyImages}
            />
          </MDBox>
        </Modal>
      </MDBox>
    </>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  // noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  // name: PropTypes.string.isRequired,
  // company: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
  // vat: PropTypes.string.isRequired,
  // noGutter: PropTypes.bool,
};

export default Bill;
