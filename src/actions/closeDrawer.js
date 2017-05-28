import {NavigationActions} from 'react-navigation';

export const closeDrawer = () => ({
  type: NavigationActions.NAVIGATE,
  routeName: 'DrawerClose',
});
