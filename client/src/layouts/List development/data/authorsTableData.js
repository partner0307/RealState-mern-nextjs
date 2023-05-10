import axios from 'axios';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import React, { useState, useEffect } from 'react';
import { apiConstants } from '../../../API/apiConstrants';
import Edit from './Editdev';
import { sweetalertsuccess } from '../../../helper/alert';
import Swal from 'sweetalert2';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';

const Data = () => {
  const [development, setDevelopment] = useState([]);
  const deletedevelopment = async (id) => {
    Swal.fire({
      title: 'Are you sure to perform this action ??',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        var message;
        message = 'Development suceesfully deleted';
        const requestBody = {
          id: id
        };
        await axios
          .put(apiConstants.DELETEDEVELOPMENT, requestBody)
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
    const result = await axios.get(apiConstants.LISTDEVELOPMENT, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    var developmentlist = [];
    for (let i = 0; i < result.data.length; i++) {
      developmentlist.push({
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].id}
          </MDTypography>
        ),
        devName: result.data[i].devName,
        area: result.data[i].area,
        zipcode: result.data[i].zipcode,
        description: result.data[i].description,
        propertyType: result.data[i].propertyType,
        buildingType: result.data[i].buildingType,
        completiondate: result.data[i].completiondate,
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].createdAt}
          </MDTypography>
        ),
        action: (
          <MDBox>
            <MDButton
              onClick={() => deletedevelopment(result.data[i].id)}
              variant="text"
              color="error">
              <Icon>delete</Icon>&nbsp;delete
            </MDButton>
            <Edit
              id={result.data[i].id}
              bannerImg={result.data[i].bannerImg}
              devName={result.data[i].devName}
              area={result.data[i].area}
              zipcode={result.data[i].zipcode}
              city={result.data[i].city}
              description={result.data[i].description}
              propertyType={result.data[i].propertyType}
              propertyFor={result.data[i].propertyFor}
              buildingType={result.data[i].buildingType}
              completiondate={result.data[i].completiondate}
              units={result.data[i].units}
              floors={result.data[i].floors}
              areaCity={result.data[i].areaCity}
              developerName={result.data[i].developerName}
              architectName={result.data[i].architectName}
              website={result.data[i].website}
              availavility={result.data[i].availavility}
              developmentImage={result.data[i].developmentImage}
            />
          </MDBox>
        )
      });
    }
    setDevelopment(developmentlist);
  };
  return {
    columns: [
      { Header: 'id', accessor: 'id', width: '7%', align: 'left' },
      { Header: 'devName', accessor: 'devName', width: '7%', align: 'left' },
      { Header: 'area', accessor: 'area', width: '7%', align: 'left' },
      { Header: 'zipcode', accessor: 'zipcode', width: '7%', align: 'left' },
      { Header: 'description', accessor: 'description', width: '7%', align: 'left' },
      { Header: 'property Type', accessor: 'propertyType', width: '14%', align: 'left' },
      { Header: 'building Type', accessor: 'buildingType', width: '14%', align: 'left' },
      { Header: 'completion date', accessor: 'completiondate', width: '14%', align: 'left' },
      { Header: 'createdAt', accessor: 'createdAt', width: '10%', align: 'left' },
      { Header: 'action', accessor: 'action', align: 'center' }
    ],
    rows: development
  };
};
export default Data;
