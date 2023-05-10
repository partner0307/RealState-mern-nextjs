import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';
// Dashboard components
import { useNavigate } from 'react-router-dom';
import { apiConstants } from '../../API/apiConstrants';

function Dashboard() {
  const [totalUsers, setUsers] = useState(0);
  const [totalProperty, setProperty] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    loaddata();
    loadProperty();
  });
  const loaddata = async () => {
    const totalregisteredusers = await axios.get(apiConstants.LISTUSERS, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    console.log(totalregisteredusers);
    setUsers(totalregisteredusers.data.length);
  };

  const loadProperty = async () => {
    const result = await axios.get(apiConstants.LISTPROPERTY, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    setProperty(result.data.length);
  };

  if (!localStorage.getItem('jwtToken')) {
    navigate('/authentication/sign-in');
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={0}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person_add"
                title="Total Users"
                count={totalUsers}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Total Property"
                count={totalProperty}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}></Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
