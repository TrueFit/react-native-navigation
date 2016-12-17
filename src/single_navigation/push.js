export const NAVIGATION_PUSH = 'NAVIGATION_PUSH';

export const push = route =>
({
  type: NAVIGATION_PUSH,
  payload: route,
});
