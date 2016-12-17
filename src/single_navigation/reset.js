export const NAVIGATION_RESET = 'NAVIGATION_RESET';
export const NAVIGATION_RESET_TO = 'NAVIGATION_RESET_TO';

export const reset = () =>
({
  type: NAVIGATION_RESET,
});

export const resetTo = route =>
({
  type: NAVIGATION_RESET_TO,
  payload: route,
});
