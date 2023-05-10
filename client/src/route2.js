import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';
import ResetPassword from 'layouts/authentication/reset-password/cover';
import Profile from 'layouts/profile';
import Review from 'layouts/review';
import Property from 'layouts/property';
import Icon from '@mui/material/Icon';
import Leads from 'layouts/leads';
import Addproperty from 'layouts/addproperty';

const routes = [
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: <Profile />
  },

  {
    type: 'collapse',
    name: 'Profile',
    key: 'profile',
    icon: <Icon fontSize="small">person_add</Icon>,
    route: '/profile',
    component: <Profile />
  },

  {
    type: 'collapse',
    name: 'Review',
    key: 'review',
    icon: <Icon fontSize="small">star</Icon>,
    route: '/review',
    component: <Review />
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
    name: 'Property',
    key: 'properties',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/properties',
    component: <Property />
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
