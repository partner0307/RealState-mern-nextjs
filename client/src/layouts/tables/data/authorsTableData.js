/* eslint-disable react/prop-types */
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import React, { useState, useEffect } from 'react';
import { apiConstants } from '../../../API/apiConstrants';
import axios from 'axios';
import { sweetalertsuccess, sweetalertwarning } from '../../../helper/alert';
import Swal from 'sweetalert2';

const Data = () => {
  const [users, setUsers] = useState([]);
  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const provideaccess = async (id, aut) => {
    if (localStorage.getItem('currentusertype') === 'superadmin') {
      Swal.fire({
        title: 'Are you sure to perform this action ??',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`
      }).then(async (result) => {
        if (result.isConfirmed) {
          var message;
          if (aut === 'No') {
            aut = 'Yes';
            message = 'User suceesfully authenticated';
          } else {
            aut = 'No';
            message = 'User suceesfully unauthorized';
          }
          const requestBody = {
            authenticated: aut,
            id: id
          };
          await axios
            .put(apiConstants.USERUPDATE, requestBody)
            .then(() => {
              loadUsers();
              sweetalertsuccess(message);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    } else {
      sweetalertwarning('You do not have rights to authenticate the users');
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(apiConstants.LISTUSERS, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    // setUsers(result.data);
    var userlist = [];
    for (let i = 0; i < result.data.length; i++) {
      var colors = 'error';
      if (result.data[i].authenticated === 'Yes') {
        colors = 'success';
      }

      userlist.push({
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].id}
          </MDTypography>
        ),
        authenticated: (
          <MDTypography
            component="a"
            onClick={() => provideaccess(result.data[i].id, result.data[i].authenticated)}
            href="#"
            variant="caption"
            color={colors}
            fontWeight="medium">
            {result.data[i].authenticated}
          </MDTypography>
        ),
        firstName: (
          <Author
            name={result.data[i].firstName + ' ' + result.data[i].lastName}
            email={result.data[i].email}
          />
        ),

        userType: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].userType}
          </MDTypography>
        ),
        username: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].username}
          </MDTypography>
        ),
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].createdAt}
          </MDTypography>
        ),
        updatedAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].updatedAt}
          </MDTypography>
        )
      });
    }
    setUsers(userlist);
  };

  return {
    columns: [
      { Header: 'id', accessor: 'id', width: '7%', align: 'left' },
      { Header: 'authenticated', accessor: 'authenticated', width: '7%', align: 'left' },
      { Header: 'firstName', accessor: 'firstName', width: '25%', align: 'left' },
      { Header: 'userType', accessor: 'userType', width: '15%', align: 'center' },
      { Header: 'username', accessor: 'username', width: '20%', align: 'center' },
      { Header: 'createdAt', accessor: 'createdAt', width: '20%', align: 'left' },
      { Header: 'updatedAt', accessor: 'updatedAt', align: 'center' }
    ],
    rows: users
  };
};
export default Data;
