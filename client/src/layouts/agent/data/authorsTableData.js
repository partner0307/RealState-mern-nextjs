import MDBox from 'components/MDBox';
import Icon from '@mui/material/Icon';
import MDTypography from 'components/MDTypography';
import React, { useState, useEffect } from 'react';
import { apiConstants } from '../../../API/apiConstrants';
import axios from 'axios';
import { sweetalertsuccess, sweetalertwarning } from '../../../helper/alert';
import Swal from 'sweetalert2';
import MDBadge from 'components/MDBadge';
import MDButton from 'components/MDButton';

// export default function data() {

const Data = () => {
  const [users, setUsers] = useState([]);
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
          // console.log(requestBody);
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

  const deleteagent = async (id) => {
    Swal.fire({
      title: 'Are you sure to perform this action ??',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        var message;
        message = 'Agent suceesfully deleted';
        const requestBody = {
          id: id
        };
        // console.log(requestBody);
        await axios
          .put(apiConstants.DELETEAGENT, requestBody)
          .then(() => {
            sweetalertsuccess(message);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
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
      var badgeContent = 'Deactive';
      if (result.data[i].authenticated === 'Yes') {
        colors = 'success';
        badgeContent = 'Active';
      }
      userlist.push({
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].id}
          </MDTypography>
        ),
        authenticated: (
          <MDBox
            onClick={() => provideaccess(result.data[i].id, result.data[i].authenticated)}
            ml={-1}>
            <MDBadge badgeContent={badgeContent} color={colors} variant="gradient" size="sm" />
          </MDBox>
        ),
        firstName: result.data[i].firstName,
        email: result.data[i].email,
        userType: result.data[i].userType,
        username: result.data[i].username,
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].createdAt}
          </MDTypography>
        ),
        action: (
          <MDButton onClick={() => deleteagent(result.data[i].id)} variant="text" color="error">
            <Icon>delete</Icon>&nbsp;delete
          </MDButton>
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
      { Header: 'email', accessor: 'email', width: '25%', align: 'left' },

      { Header: 'userType', accessor: 'userType', width: '10%', align: 'left' },
      { Header: 'username', accessor: 'username', width: '20%', align: 'left' },
      { Header: 'createdAt', accessor: 'createdAt', width: '20%', align: 'left' },
      { Header: 'action', accessor: 'action', align: 'center' }
    ],
    rows: users
  };
};
export default Data;
