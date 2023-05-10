import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';
import ResetPassword from 'layouts/authentication/reset-password/cover';
import Addagent from 'layouts/addagent';
import Property from 'layouts/property';
import Agent from 'layouts/agent';
import Icon from '@mui/material/Icon';
import Dashboard from 'layouts/dashboard';
import Payments from 'layouts/payments';
import Leads from 'layouts/leads';
import Development from 'layouts/development';
import Addproperty from 'layouts/addproperty';
import Listdevelopment from 'layouts/List development';

const routes = [
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />
  },
  {
    type: 'collapse',
    name: 'Development',
    key: 'development',
    icon: <Icon fontSize="small">house</Icon>,
    route: '/development',
    component: <Development />
  },
  {
    type: 'collapse',
    name: 'Payment',
    key: 'payment',
    icon: <Icon fontSize="small">money</Icon>,
    route: '/payment',
    component: <Payments />
  },
  {
    type: 'collapse',
    name: 'My Leads',
    key: 'my_leads',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/myleads',
    component: <Leads />
  },
  {
    type: 'collapse',
    name: 'Add agent',
    key: 'add_agent',
    icon: <Icon fontSize="small">boy</Icon>,
    route: '/add_agent',
    component: <Addagent />
  },
  {
    type: 'collapse',
    name: 'Agent listing',
    key: 'agent',
    icon: <Icon fontSize="small">list</Icon>,
    route: '/agents',
    component: <Agent />
  },

  {
    type: 'collapse',
    name: 'Property',
    key: 'properties',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/properties',
    component: <Property />
  },
  {
    type: 'collapse',
    name: 'Add property',
    key: 'add_property',
    icon: <Icon fontSize="small">fact_check</Icon>,
    route: '/add_property',
    component: <Addproperty />
  },
  {
    type: 'collapse',
    name: 'List development',
    key: 'development_list',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/development_list',
    component: <Listdevelopment />
  },
  {
    type: 'notype',
    name: 'Change password',
    key: 'change-password',
    icon: <Icon fontSize="small">login</Icon>,
    route: '/authentication/reset-password',
    component: <ResetPassword />
  },
  {
    type: 'notype',
    name: 'Sign In',
    key: 'sign-in',
    icon: <Icon fontSize="small">login</Icon>,
    route: '/authentication/sign-in',
    component: <SignIn />
  },
  {
    type: 'notype',
    name: 'Sign Up',
    key: 'sign-up',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/sign-up',
    component: <SignUp />
  }
];

export default routes;
