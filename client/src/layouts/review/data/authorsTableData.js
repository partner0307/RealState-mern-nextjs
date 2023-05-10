import { useState, useEffect } from 'react';
import { apiConstants } from '../../../API/apiConstrants';
import axios from 'axios';

const Data = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(apiConstants.REVIEWS, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    // setUsers(result.data);
    var userlist = [];
    for (let i = 0; i < result.data.length; i++) {
      userlist.push({
        id: result.data[i].id,
        agentName: result.data[i].agentName,
        contact: result.data[i].contact,
        from: result.data[i].from,
        reviewFrom: result.data[i].reviewFrom,
        reviewDesc: result.data[i].reviewDesc,
        knowledge: result.data[i].knowledge,
        expertise: result.data[i].expertise,
        responsive: result.data[i].responsive,
        nrgoation: result.data[i].nrgoation,
        punctuality: result.data[i].punctuality,
        approval: result.data[i].approval,
        createdAt: result.data[i].createdAt
      });
    }
    setUsers(userlist);
  };
  return {
    columns: [
      { Header: 'id', accessor: 'id', width: '7%', align: 'left' },
      { Header: 'agentName', accessor: 'agentName', align: 'left' },
      { Header: 'contact', accessor: 'contact', align: 'left' },
      { Header: 'from', accessor: 'from', align: 'center' },
      { Header: 'reviewFrom', accessor: 'reviewFrom', align: 'center' },
      { Header: 'reviewDesc', accessor: 'reviewDesc', align: 'left' },
      { Header: 'knowledge', accessor: 'knowledge', align: 'center' },
      { Header: 'expertise', accessor: 'expertise', align: 'center' },
      { Header: 'responsive', accessor: 'responsive', align: 'center' },
      { Header: 'nrgoation', accessor: 'nrgoation', align: 'center' },
      { Header: 'punctuality', accessor: 'punctuality', align: 'center' },
      { Header: 'approval', accessor: 'approval', align: 'center' },
      { Header: 'createdAt', accessor: 'createdAt', align: 'center' }
    ],
    rows: users
  };
};
export default Data;
