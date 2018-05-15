# truefit-navigation
This repo is a wrapper around [React Navigation](https://reactnavigation.org/).

The goal of this package is to encapsulate the setup of React Navigation connected to Redux, thus allowing the developer to focus on the needs of the app more quickly.

## Installation
```
npm install truefit-navigation --save
```

or

```
yarn add truefit-navigation
```

## Setup
### configureNavigation
This function creates the AppNavigator and initializes it "globally" inside the package. It follows the standard React Navigation setup of your desired navigator (see [API Docs](https://reactnavigation.org/docs/api-reference.html)).

The arguments to pass the configureNavigation method are as follows:

| Index | Value |
| ------------- |:-------------:|
| 0 | Root Navigator Type |
| 1 | Route Navigation Configuration |
| 2 | Navigator Configuration |
| 3 | Initial Route Name |

**It is required that this function is called BEFORE you create your redux store**

##### Basic code example:
```
import {SwitchNavigator} from 'react-navigation';
import {configureNavigation} from 'truefit-navigation';

// import route names
import {BLANK} from '../routes';

// import components
import {Blank} from '../features/shared/components';

// create routeConfiguration
export const routeConfig = {
  [BLANK]: {screen: Blank},
};

// create navigator config
export const navigatorConfig = {
};

// config
export default () => {
  configureNavigation(SwitchNavigator, routeConfig, navigatorConfig, BLANK);
};
```
*At [Truefit](https://truefit.io), we prefer to break our route names out into their own file for easy access that doesn't create a circular import chain.*

##### Code example with drawer and stack navigators:
```
import {SwitchNavigator, DrawerNavigator, StackNavigator} from 'react-navigation';
import {configureNavigation} from 'truefit-navigation';

// import route names
import {
  BOOT, SIGNIN, LANDING, DRAWER,
  TEAM_DASHBOARD, COMPANY_DASHBOARD,
  DRAWER_COMPANY_DASHBOARD, DRAWER_TEAM_DASHBOARDS,
} from '../routes';

// import components
import {Signin} from '../features/authorization/components';
import {Boot, Landing} from '../features/shared/components';
import {Dashboard as TeamDashboard} from '../features/teams/components';
import {Dashboard as CompanyDashboard} from '../features/companies/components';

// create route config
const CompanyStack = StackNavigator(
  {
    [COMPANY_DASHBOARD]: {screen: CompanyDashboard},
  },
);

const TeamStack = StackNavigator(
  {
    [LANDING]: {screen: Landing},
    [TEAM_DASHBOARD]: {screen: TeamDashboard},
  },
);

// each item in the drawer is a stack so the headers work
const Drawer = DrawerNavigator(
  {
    [DRAWER_COMPANY_DASHBOARD]: {screen: CompanyStack},
    [DRAWER_TEAM_DASHBOARDS]: {screen: TeamStack},
  },
  {
    drawerPosition: 'right',
    initialRoute: [DRAWER_COMPANY_DASHBOARD],
  },
);

export const routeConfig = {
  [BOOT]: {screen: Boot},
  [SIGNIN]: {screen: Signin},
  [DRAWER]: {screen: Drawer},
};

// create navigator config
export const navigatorConfig = {
};

// config
export default () => {
  configureNavigation(SwitchNavigator, routeConfig, navigatorConfig, BOOT);
};
```

### createNavigationReducer
This function will return the reducer that contains the navigation state.

**You must place this at a reducer node named "navigation" at the highest level of your root reducer**

##### Code example: 
```
import {combineReducers} from 'redux';
import {createNavigationReducer} from 'truefit-navigation';
import shared from './features/shared/reducers';

const rootReducer = combineReducers({
  navigation: createNavigationReducer(),
  features: combineReducers({
    shared,
  }),
});

export default rootReducer;
```

### ConnectedNavigator
The ConnectedNavigator should go at the root of your application, right inside the Provider tag. It will control the rest via navigation from there.

##### Code example: 
```
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedNavigator} from 'truefit-navigation';

export default class App extends Component {
  render() {
    return (
      <Provider store={this.state.store}>
        <ConnectedNavigator />
      </Provider>
    );
  }
}
```

### navigationMiddleware
Just include it in your redux middleware array when creating your redux store.

### Creating your redux store
Due to React Navigation requiring essentially a singleton AppNavigator, we have to do a little "magic" to make this work right. This means there is definitely some unfortunate frailty on the setup being done in the right order. This create a couple of requirements:

1. You must call configureNavigation **BEFORE** you create your redux store.
2. When creating your store, rather than using the ES6 import syntax for your rootReducer, you need to use the require syntax so that it is evaluated at execution (see code example below)

##### Code example:
```
const middleware = [
  thunkMiddleware,
  promiseMiddlware(),
  asyncAwaitMiddleware,
  navigationMiddleware,
];

const rootReducer = () => require('../rootReducer').default; // eslint-disable-line
const createStore = middleware => createStore(rootReducer(), applyMiddleware(...middleware));
```

### Navigating in action creators
Using actions to move between screens is easy with NavigationActions.

##### Code Example:
```
import {NavigationActions} from 'react-navigation';
import {LOGIN} from '../../../routes';

export const LOGOUT = 'LOGOUT';

export const logout = () => dispatch => {
  dispatch({type: LOGOUT});
  dispatch(NavigationActions.navigate({routeName: LOGIN}));
};
```

### Sample icon for drawer navigation
If you are using a drawer navigator, this icon may come in handy.

##### Code example:
```
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

const DrawerIcon = props => (
  <Button transparent onPress={() => props.navigation.navigate('DrawerOpen')} {...props}>
    <Icon style={styles.icon} name="menu" size={25} />
  </Button>
);

export default DrawerIcon;
```

### Sample navigationOptions
Here's an example of passing navigation to a button in your header that needs to provide navigation.

##### Code example:
```
  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <DrawerIcon navigation={navigation} />
    ),
  })
```

## Transition from < 1.0.0
Before this latest version, this package maintained the navigation state in redux and applied that to the react React Navigation Navigators. Now that React Navigation has matured, this extra layer is no longer needed, allowing this package to be streamlined considerably. We no longer need to provide wrapped actions or our own dsl for describing route trees and now can use the standard React Navigation setup.

In addition, due to a recently discovered gradle bug in 0.23.0, we are shortening the name of the package from truefit-react-native-navigation to truefit-navigation

## Upgrading your app from < 1.0.0
If you are upgrading from a previoius version of truefit-navigation, this checklist may come in handy. Refer to the examples above and template code and examples available from [Truefit](https://truefit.io).

1. Uninstall truefit-react-native-navigation (using yarn or npm)
2. Install truefit-navigation (using yarn or npm)
3. Update app.js to use ConnectedNavigator
4. Update rootReducer to use createNavigationReducer
5. Update configureStore
6. Update configureNavigation
7. Update action creators to use NavigationActions
8. For drawer navigation, add drawerIcon.js
9. Update navigationOptions in components to pass {navigation} as needed
