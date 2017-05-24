import {NavigationActions} from 'react-navigation';

export const navigate = (routeName, params) => NavigationActions.navigate({routeName, params});
