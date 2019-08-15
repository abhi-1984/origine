import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PageTitle({ label, goBack }) {
  return (
    <View style={styles.header}>
      <Text style={styles.pageTitle}>{label}</Text>
      <TouchableOpacity style={styles.backIcon} onPress={goBack}>
        <Ionicons name='ios-arrow-down' size={20} color='black' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  backIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
