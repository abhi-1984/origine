import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderView({ openAddSubscriptionView }) {
  return (
    <View style={styles.headerView}>
      <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>Subscriptions</Text>
        <Text style={styles.headerSubtitle}>Avg. Expenses $45.00/mo</Text>
      </View>
      <TouchableOpacity onPress={openAddSubscriptionView}>
        <Ionicons
          style={styles.headerIcon}
          name='ios-add-circle'
          size={30}
          color='black'
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  headerTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '500',
    marginBottom: 5
  },
  headerSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.6
  },
  headerIcon: {
    marginTop: 5
  }
});
