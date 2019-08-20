import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import SettingsRow from '../components/SettingsRow';
import Version from '../components/Version';
import Popover from '../components/Popover';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedCurrencyData,
  setDefaultSortTypeData,
  setDefaultHighAlertAmountData
} from '../actions';
import firebase from 'firebase';
import Constants from 'expo-constants';

const deviceID = Constants.installationId;
export default function Settings({ navigation }) {
  //REDUX
  const currencyData = useSelector(state => state.currencyReducer);
  const dispatch = useDispatch();

  //LOCAL STATE
  const [currencies, setCurrencies] = useState([]);
  const [isCurrencySelection, setCurrencySelection] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)');
  const [highAlertAmount, setHighAlertAmount] = useState('1500');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setCurrencies([...currencyData]);
    firebase
      .database()
      .ref(`${deviceID}/preferences`)
      .on('value', data => {
        let jsonData = data.toJSON();

        setHighAlertAmount(jsonData ? jsonData.highAlertAmount : '1500');
        setSelectedCurrency(jsonData ? jsonData.currency : 'USD ($)');
        setLoading(false);
      });
  }, []);

  setGlobalPreferences = data => {
    firebase
      .database()
      .ref(`${deviceID}/preferences`)
      .set(data);
  };

  openAboutScreen = () => {
    navigation.push('About');
  };

  openCurrencyModal = () => {
    setCurrencySelection(true);
  };

  closeCurrencyModal = item => {
    if (item) {
      dispatch(setSelectedCurrencyData(item));
    }
    firebase
      .database()
      .ref(`${deviceID}/preferences/`)
      .update({ currency: item });
    setCurrencySelection(false);
  };

  onCurrencyChange = (item, itemPosition) => {
    setSelectedCurrency(item);
  };

  return (
    <View style={styles.settingsWrapper}>
      <Popover
        isVisible={isCurrencySelection}
        title='Set default currency'
        pickerData={currencies}
        selectedPickerValue={selectedCurrency}
        onCloseAction={() => closeCurrencyModal(selectedCurrency)}
        setPickerValue={itemValue => onCurrencyChange(itemValue)}
      />

      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Preferences</Text>
      </View>
      <KeyboardAvoidingView behavior='position'>
        <ScrollView style={styles.settingsList}>
          <SettingsRow
            title='Default Currency'
            defaultValue={selectedCurrency}
            onPressAction={() => openCurrencyModal()}
          />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>High Alert Amount</Text>
            <TextInput
              allowFontScaling={true}
              maxLength={5}
              returnKeyType='done'
              keyboardType={'numeric'}
              onChangeText={amount => {
                firebase
                  .database()
                  .ref(`${deviceID}/preferences/`)
                  .update({ highAlertAmount: amount });
                setHighAlertAmount(amount);
                dispatch(setDefaultHighAlertAmountData(amount));
              }}
              value={highAlertAmount}
              style={styles.rowField}
            />
          </View>

          <SettingsRow
            onPressAction={() => openAboutScreen()}
            title='About Us'
            defaultValue=''
          />
          <Version versionNumber='v 1.0' />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
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
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    zIndex: 10
  },
  pageTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '500'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    borderBottomWidth: 1
  },
  rowLabel: {
    fontSize: 16
  },
  rowField: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10
  }
});
