import React from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SettingsRow from '../components/SettingsRow';
import Version from '../components/Version';

export default class Settings extends React.Component {
  static navigationOptions = {
    header: null
  };

  openAboutScreen = () => {
    this.props.navigation.push('About');
  };

  render() {
    return (
      <View style={styles.settingsWrapper}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Preferences</Text>
        </View>
        <ScrollView style={styles.settingsList}>
          <SettingsRow title='View Total as' defaultValue='Avg. Expenses' />
          <SettingsRow title='Default Currency' defaultValue='USD ($)' />
          <SettingsRow title='Sort Subscription' defaultValue='Max. Amount' />
          <SettingsRow title='High Alert Amount' defaultValue='$80.00' />
          <SettingsRow
            onPressAction={() => this.openAboutScreen()}
            title='About Us'
            defaultValue=''
          />
          <SettingsRow title='Rate Us' defaultValue='' />
          <Version versionNumber='v 1.0' />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsWrapper: {
    flex: 1
  },
  settingsList: {
    paddingHorizontal: 30
  },
  pageHeader: {
    width: '100%',
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  pageTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '500'
  }
});
