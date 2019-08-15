import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SubscriptionRow({ data, onPressAction }) {
  return (
    <TouchableOpacity onPress={onPressAction} style={styles.row}>
      <Image style={styles.logo} source={data.logo} resizeMode={'contain'} />
      <View style={styles.subscriptionInfo}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.billingCycle}>Billed Monthly</Text>
      </View>
      <Text style={[styles.amount, data.amount >= 90 && styles.highAmount]}>
        ${data.amount}
      </Text>
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
    paddingVertical: 20
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
    marginRight: 15
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24
  },
  billingCycle: {
    fontSize: 13,
    opacity: 0.6,
    lineHeight: 18
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'right'
  },
  highAmount: {
    color: '#DD1F2A'
  }
});
