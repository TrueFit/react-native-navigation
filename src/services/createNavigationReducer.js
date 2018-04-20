export default () => {
  const {AppNavigator, InitialRoute} = require('../global/navigator');

  const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(InitialRoute));

  return (state = initialState, action) => AppNavigator.router.getStateForAction(action, state) || state;
};
