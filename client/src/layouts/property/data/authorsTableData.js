import axios from 'axios';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import React, { useState, useEffect } from 'react';
import { apiConstants } from '../../../API/apiConstrants';
import Edit from './EditProperty';
import { sweetalertsuccess } from '../../../helper/alert';
import Swal from 'sweetalert2';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';

const Data = () => {
  const [property, setProperty] = useState([]);
  const deleteproperty = async (id) => {
    Swal.fire({
      title: 'Are you sure to perform this action ??',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        var message;
        message = 'Property suceesfully deleted';
        const requestBody = {
          id: id
        };
        console.log(requestBody);
        await axios
          .put(apiConstants.DELETEPROPERTY, requestBody)
          .then(() => {
            loadProperty();
            sweetalertsuccess(message);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };
  useEffect(() => {
    loadProperty();
  }, []);
  const loadProperty = async () => {
    const result = await axios.get(apiConstants.LISTPROPERTY, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    var propertylist = [];
    for (let i = 0; i < result.data.length; i++) {
      propertylist.push({
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].id}
          </MDTypography>
        ),
        address: result.data[i].address,
        state: result.data[i].state,
        city: result.data[i].city,
        propertyType: result.data[i].propertyType,
        propertyFor: result.data[i].propertyFor,
        featuredProperty: result.data[i].featuredProperty,
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].createdAt}
          </MDTypography>
        ),
        action: (
          <MDBox>
            <MDButton
              onClick={() => deleteproperty(result.data[i].id)}
              variant="text"
              color="error">
              <Icon>delete</Icon>&nbsp;delete
            </MDButton>
            <Edit
              id={result.data[i].id}
              address={result.data[i].address}
              locality={result.data[i].locality}
              street={result.data[i].street}
              state={result.data[i].state}
              city={result.data[i].city}
              zipcode={result.data[i].zipcode}
              featuredProperty={result.data[i].featuredProperty}
              propertyFor={result.data[i].propertyFor}
              propertyType={result.data[i].propertyType}
              thePrice={result.data[i].thePrice}
              securityDeposit={result.data[i].securityDeposit}
              beds={result.data[i].beds}
              baths={result.data[i].baths}
              kitchenSize={result.data[i].kitchenSize}
              buildupArea={result.data[i].buildupArea}
              leaseDuration={result.data[i].leaseDuration}
              serventQuarters={result.data[i].serventQuarters}
              calling={result.data[i].calling}
              appliances={result.data[i].appliances}
              floorSize={result.data[i].floorSize}
              flooringType={result.data[i].flooringType}
              dateAvailable={result.data[i].dateAvailable}
              propertyDesc={result.data[i].propertyDesc}
              accomodation={result.data[i].accomodation}
              plotSize={result.data[i].plotSize}
              yourBuilt={result.data[i].yourBuilt}
              parking={result.data[i].parking}
              services={result.data[i].services}
              nearBylocality={result.data[i].nearBylocality}
              propertyImages={result.data[i].propertyImages}
            />
          </MDBox>
        )
      });
    }
    setProperty(propertylist);
  };
  return {
    columns: [
      { Header: 'id', accessor: 'id', width: '7%', align: 'left' },
      { Header: 'address', accessor: 'address', width: '7%', align: 'left' },
      { Header: 'state', accessor: 'state', width: '7%', align: 'left' },
      { Header: 'city', accessor: 'city', width: '7%', align: 'left' },
      { Header: 'zipcode', accessor: 'zipcode', width: '7%', align: 'left' },
      { Header: 'featured Property', accessor: 'featuredProperty', width: '14%', align: 'left' },
      { Header: 'Property type', accessor: 'propertyType', width: '14%', align: 'left' },
      { Header: 'Property for', accessor: 'propertyFor', width: '14%', align: 'left' },

      { Header: 'createdAt', accessor: 'createdAt', width: '10%', align: 'left' },
      { Header: 'action', accessor: 'action', align: 'center' }
    ],
    rows: property
  };
};
export default Data;
