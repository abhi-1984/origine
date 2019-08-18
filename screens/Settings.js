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
  setDefaultTotalTypeData,
  setDefaultSortTypeData,
  setDefaultHighAlertAmountData
} from '../actions';

export default function Settings({ navigation }) {
  //REDUX
  const currencyData = useSelector(state => state.currencyReducer);
  const dispatch = useDispatch();

  //LOCAL STATE
  const [totalType, setTotalType] = useState([
    'Avg. Expenses',
    'Total Expenses'
  ]);
  const [selectedTotalType, setSelectedTotalType] = useState('');
  const [isExpenseTypeSelection, setExpenseTypeSelection] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const [isCurrencySelection, setCurrencySelection] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)');
  const [sortType, setSortType] = useState([
    'Max. Amount',
    'Min. Amount',
    'Alphabetical'
  ]);
  const [isSortTypeSelection, setSortTypeSelection] = useState(false);
  const [selectedSortType, setSelectedSortType] = useState('');
  const [highAlertAmount, setHighAlertAmount] = useState('50');
  const [isHighAlertAmountViewOpen, setHighAlertAmountView] = useState(false);

  useEffect(() => {
    setSelectedTotalType(totalType[0]);
    setSelectedSortType(sortType[0]);
    setCurrencies([...currencyData]);
  }, []);

  openAboutScreen = () => {
    navigation.push('About');
  };

  openExpenseTypeSelectionModal = () => {
    setExpenseTypeSelection(true);
  };

  closeExpenseTypeSelectionModal = item => {
    if (item) {
      dispatch(setDefaultTotalTypeData(item));
    }
    setExpenseTypeSelection(false);
  };

  onTotalTypeChange = (itemValue, itemPosition) => {
    setSelectedTotalType(itemValue);
  };

  openCurrencyModal = () => {
    setCurrencySelection(true);
  };

  closeCurrencyModal = item => {
    if (item) {
      dispatch(setSelectedCurrencyData(item));
    }
    setCurrencySelection(false);
  };

  onCurrencyChange = (item, itemPosition) => {
    setSelectedCurrency(item);
  };

  openSortTypeSelectionModal = () => {
    setSortTypeSelection(true);
  };

  closeSortTypeSelectionModal = item => {
    if (item) {
      dispatch(setDefaultSortTypeData(item));
    }
    setSortTypeSelection(false);
  };

  onSortTypeChange = (item, itemPosition) => {
    setSelectedSortType(item);
  };

  closeHighAlertAmountModal = () => {
    setHighAlertAmountView(false);
  };

  openHighAlertAmountModal = () => {
    setHighAlertAmountView(true);
  };

  return (
    <View style={styles.settingsWrapper}>
      <Popover
        isVisible={isExpenseTypeSelection}
        title='View Total as'
        pickerData={totalType}
        selectedPickerValue={selectedTotalType}
        onCloseAction={() => closeExpenseTypeSelectionModal(selectedTotalType)}
        setPickerValue={itemValue => onTotalTypeChange(itemValue)}
      />

      <Popover
        isVisible={isCurrencySelection}
        title='Set default currency'
        pickerData={currencies}
        selectedPickerValue={selectedCurrency}
        onCloseAction={() => closeCurrencyModal(selectedCurrency)}
        setPickerValue={itemValue => onCurrencyChange(itemValue)}
      />

      <Popover
        isVisible={isSortTypeSelection}
        title='Set Sort type'
        pickerData={sortType}
        selectedPickerValue={selectedSortType}
        onCloseAction={() => closeSortTypeSelectionModal(selectedSortType)}
        setPickerValue={itemValue => onSortTypeChange(itemValue)}
      />

      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Preferences</Text>
      </View>
      <KeyboardAvoidingView behavior='position'>
        <ScrollView style={styles.settingsList}>
          <SettingsRow
            title='View Total as'
            onPressAction={() => openExpenseTypeSelectionModal()}
            defaultValue={selectedTotalType}
          />
          <SettingsRow
            title='Default Currency'
            defaultValue={selectedCurrency}
            onPressAction={() => openCurrencyModal()}
          />
          <SettingsRow
            title='Sort Subscription'
            defaultValue={selectedSortType}
            onPressAction={() => openSortTypeSelectionModal()}
          />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>High Alert Amount</Text>
            <TextInput
              allowFontScaling={true}
              maxLength={5}
              returnKeyType='done'
              keyboardType={'numeric'}
              onChangeText={highAlertAmount => {
                setHighAlertAmount(highAlertAmount);
                dispatch(setDefaultHighAlertAmountData(highAlertAmount));
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
          <SettingsRow title='Rate Us' defaultValue='' />
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
    paddingTop: 45,
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
