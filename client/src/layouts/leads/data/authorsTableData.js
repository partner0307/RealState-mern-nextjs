import MDTypography from 'components/MDTypography';
import React, { useState, useEffect } from 'react';
import { apiConstants } from '../../../API/apiConstrants';
import axios from 'axios';

// export default function data() {

const Data = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(apiConstants.LEADS, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    var leadlist = [];
    for (let i = 0; i < result.data.length; i++) {
      leadlist.push({
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {result.data[i].id}
          </MDTypography>
        ),
        agentId: result.data[i].agentId,
        phone: result.data[i].phone,
        from: result.data[i].from,
        email: result.data[i].email,
        description: result.data[i].description,
        createdAt: result.data[i].createdAt
      });
    }
    setUsers(leadlist);
  };

  return {
    columns: [
      { Header: 'id', accessor: 'id', width: '7%', align: 'left' },
      { Header: 'Agent', accessor: 'agentId', width: '15%', align: 'left' },
      { Header: 'Phone', accessor: 'phone', width: '15%', align: 'left' },
      { Header: 'From', accessor: 'from', width: '15%', align: 'left' },
      { Header: 'email', accessor: 'email', width: '15%', align: 'center' },
      { Header: 'Description', accessor: 'description', width: '20%', align: 'left' },
      { Header: 'Created At', accessor: 'createdAt', align: 'center' }
    ],
    rows: users
  };
};
export default Data;
