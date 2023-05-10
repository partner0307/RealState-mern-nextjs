import MDTypography from 'components/MDTypography';
import React, { useState, useEffect } from 'react';
import { apiConstants } from '../../../API/apiConstrants';
import axios from 'axios';

const Data = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(apiConstants.PAYMENTS, {
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
        customerNName: result.data[i].customerNName,
        emailId: result.data[i].emailId,
        agentType: result.data[i].agentType,
        createdAt: result.data[i].createdAt,
        plan: result.data[i].plan,
        amount: result.data[i].amount
      });
    }
    setUsers(leadlist);
  };

  return {
    columns: [
      { Header: 'id', accessor: 'id', width: '7%', align: 'left' },
      { Header: 'Asigned By', accessor: 'customerNName', width: '7%', align: 'left' },
      { Header: 'Admin message', accessor: 'emailId', width: '25%', align: 'left' },
      { Header: 'Status', accessor: 'agentType', width: '15%', align: 'center' },
      { Header: 'Plan', accessor: 'plan', width: '20%', align: 'left' },
      { Header: 'Amount', accessor: 'amount', width: '20%', align: 'left' },
      { Header: 'Created At', accessor: 'createdAt', align: 'center' }
    ],
    rows: users
  };
};
export default Data;
