import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SettingsRow extends React.Component {
  render() {
    const { title, defaultValue, onPressAction } = this.props;

    return (
      <TouchableOpacity style={styles.settingsRow} onPress={onPressAction}>
        <Text style={styles.settingsRowTitle}>{title}</Text>
        <View style={styles.settingsInfo}>
          <Text style={styles.settingsRowLabel}>{defaultValue}</Text>
          <Ionicons
            style={styles.settingsRowIcon}
            name='ios-arrow-forward'
            size={20}
            color='black'
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  settingsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    borderBottomWidth: 1
  },
  settingsRowTitle: {
    fontSize: 16
  },
  settingsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingsRowLabel: {
    fontSize: 16,
    opacity: 0.6
  },
  settingsRowIcon: {
    marginLeft: 10,
    opacity: 0.6
  }
});
