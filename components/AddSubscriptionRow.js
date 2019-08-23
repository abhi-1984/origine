import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddSubscriptionRow({ label, handlePress, color }) {
  return (
    <TouchableOpacity style={styles.row} onPress={handlePress}>
      <View style={[styles.logo, { backgroundColor: color }]} />
      <View style={styles.subscriptionInfo}>
        <Text style={styles.name}>{label}</Text>
      </View>
      <View style={styles.addIconBG}>
        <Ionicons
          style={styles.addIcon}
          name='ios-add'
          size={20}
          color='black'
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    borderBottomWidth: 1
  },
  subscriptionInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 15
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 15,
    borderRadius: 22.5
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24
  },
  addIconBG: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEDF0'
  }
});
