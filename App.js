import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import Home from './screens/Home';
import Settings from './screens/Settings';
import About from './screens/About';
import AddSubscription from './screens/AddSubscription';
import FormView from './screens/FormView';
import AppNavigator from './navigator/AppNavigator';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.SafeAreaView}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SafeAreaView: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});
