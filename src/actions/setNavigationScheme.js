export const SET_NAVIGATION_SCHEME = 'SET_NAVIGATION_SCHEME';

export const setNavigationScheme = (type, initialRoute) => ({
  type: SET_NAVIGATION_SCHEME,
  payload: {type, initialRoute},
});