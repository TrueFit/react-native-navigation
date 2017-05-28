import {NavigationActions} from 'react-navigation';

export const openDrawer = () => ({
  type: NavigationActions.NAVIGATE,
  routeName: 'DrawerOpen',
});
