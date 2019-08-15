import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Version({ versionNumber }) {
  return (
    <View style={styles.versionView}>
      <Text style={styles.versionNumber}>{versionNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  versionView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  versionNumber: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.3
  }
});
