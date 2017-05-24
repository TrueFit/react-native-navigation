import {NavigationActions} from 'react-navigation';

export const reset = (routeName, params) => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName, params}),
  ],
});
