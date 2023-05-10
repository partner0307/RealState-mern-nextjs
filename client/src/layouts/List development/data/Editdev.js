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
import Editdevelopment from 'layouts/development/Editdevelopment';

function Bill({
  id,
  bannerImg,
  devName,
  area,
  zipcode,
  city,
  description,
  propertyType,
  propertyFor,
  buildingType,
  completiondate,
  units,
  floors,
  areaCity,
  developerName,
  architectName,
  website,
  availavility,
  developmentImage
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
            <Editdevelopment
              data={'test'}
              id={id}
              bannerImg={bannerImg}
              devName={devName}
              area={area}
              zipcode={zipcode}
              city={city}
              description={description}
              propertyType={propertyType}
              propertyFor={propertyFor}
              buildingType={buildingType}
              completiondate={completiondate}
              units={units}
              floors={floors}
              areaCity={areaCity}
              developerName={developerName}
              architectName={architectName}
              website={website}
              availavility={availavility}
              developmentImage={developmentImage}
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
