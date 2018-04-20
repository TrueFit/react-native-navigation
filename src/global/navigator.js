export let AppNavigator = null; // eslint-disable-line
export let InitialRoute = null; // eslint-disable-line

export const createNavigator = (Navigator, routeConfig, navigatorConfig, initalRoute) => {
  AppNavigator = Navigator(routeConfig, navigatorConfig); // eslint-disable-line
  InitialRoute = initalRoute;
};
