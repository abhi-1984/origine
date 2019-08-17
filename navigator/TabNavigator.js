import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import About from '../screens/About';
import FormView from '../screens/FormView';
import AddSubscription from '../screens/AddSubscription';
import Popover from '../screens/Popover';
import { Ionicons } from '@expo/vector-icons';

const activeColor = '#000000';
const inactiveColor = '#A2A2A2';

const HomeStack = createStackNavigator(
  {
    Home,
    AddSubscription,
    FormView
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      header: null
    }
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'AddSubscription' || routeName == 'FormView') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Subscriptions',

    tabBarIcon: ({ focused }) => (
      <Ionicons
        name='ios-albums'
        size={24}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

const SettingsStack = createStackNavigator(
  {
    Settings,
    About,
    Popover
  },
  {
    mode: 'modal'
  }
);

SettingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'About' || routeName == 'Popover') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Preferences',
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name='ios-settings'
        size={24}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: activeColor,
      inactiveTintColor: inactiveColor
    }
  }
);

export default TabNavigator;
