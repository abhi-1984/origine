import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import About from '../screens/About';
import FormView from '../screens/FormView';
import Settings from '../screens/Settings';
import AddSubscription from '../screens/AddSubscription';
import TabNavigator from './TabNavigator';

const AppNavigator = createStackNavigator(
  {
    Home,
    About,
    FormView,
    Settings,
    AddSubscription
  },
  {
    mode: 'modal'
  }
);

export default createAppContainer(TabNavigator);
