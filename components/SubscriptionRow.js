import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import Constants from 'expo-constants';

const deviceID = Constants.installationId;

export default function SubscriptionRow({ data, onPressAction }) {
  const [globalHighCurrencyRate, setGlobalHighCurrencyRate] = useState('0');

  useEffect(() => {
    firebase
      .database()
      .ref(`${deviceID}/preferences`)
      .on('value', data => {
        let jsonData = data.toJSON();
        setGlobalHighCurrencyRate(jsonData ? jsonData.highAlertAmount : '0');
      });
  }, []);

  const defaultCurrencyData = useSelector(
    state => state.setDefaultCurrencyReducer
  );

  const defaultHighAlertAmount = useSelector(
    state => state.setDefaultHighAlertAmountReducer
  );

  return (
    <TouchableOpacity onPress={onPressAction} style={styles.row}>
      {console.log('highAlertAmount is.>', globalHighCurrencyRate)}
      {data.isCustomSubscription ? (
        <View
          style={[
            styles.logo,
            { backgroundColor: data.color, borderRadius: 22.5 }
          ]}
        />
      ) : (
        <Image style={styles.logo} source={data.logo} resizeMode={'contain'} />
      )}

      <View style={styles.subscriptionInfo}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.billingCycle}>Billed {data.billingCycle}</Text>
      </View>
      <Text
        style={[
          styles.amount,
          data.amount >= parseInt(globalHighCurrencyRate) && styles.highAmount
        ]}
      >
        {defaultCurrencyData.match(/\(([^)]+)\)/)[1]}
        {data.amount}
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
