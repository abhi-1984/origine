import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Popover extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.popoverView}>
        <Text>HAHAHa</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popoverView: {
    opacity: 0.8
  }
});
