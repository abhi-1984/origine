import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
  Picker,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import SettingsRow from '../components/SettingsRow';
import Version from '../components/Version';
import { Ionicons } from '@expo/vector-icons';
import Popover from '../components/Popover';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default class Settings extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    totalType: ['Avg. Expenses', 'Total Expenses'],
    selectedTotalType: '',
    openExpenseTypeSelection: false,
    supportedCurrencies: [
      'AUD ($)',
      'BGN (лв)',
      'BRL (R$)',
      'CAD ($)',
      'CHF',
      'CNY (¥)',
      'CZK (Kč)',
      'DKK (kr)',
      'EUR (€)',
      'GBP (£)',
      'HKD ($)',
      'ILS (₪)',
      'INR (₹)',
      'ISK (kr)',
      'JPY (￥)',
      'KRW (₩)',
      'MXN ($)',
      'MYR (RM)',
      'NOK (kr)',
      'NZD ($)',
      'PHP (P)',
      'PLN (zł)',
      'RON',
      'RUB (руб)',
      'SEK (kr)',
      'SGD ($)',
      'THB (฿)',
      'TRY (Tl)',
      'USD ($)',
      'ZAR (R)'
    ],
    selectedCurrency: '',
    openCurrencySelection: false,
    availableSortType: ['Max. Amount', 'Min. Amount', 'Alphabetical'],
    selectedSortType: '',
    openSortTypeSelection: false,
    highAlertAmount: '50',
    openHighAlertAmountView: false
  };

  componentDidMount() {
    this.setState({
      selectedTotalType: this.state.totalType[0],
      selectedCurrency: this.state.supportedCurrencies[0],
      selectedSortType: this.state.availableSortType[0]
    });
  }

  openAboutScreen = () => {
    this.props.navigation.push('About');
  };

  openExpenseTypeSelectionModal = () => {
    this.setState({
      openExpenseTypeSelection: true
    });
  };

  closeExpenseTypeSelectionModal = () => {
    this.setState({
      openExpenseTypeSelection: false
    });
  };

  onTotalTypeChange = (itemValue, itemPosition) => {
    this.setState({
      selectedTotalType: itemValue
    });
  };

  openCurrencyModal = () => {
    this.setState({
      openCurrencySelection: true
    });
  };

  closeCurrencyModal = () => {
    this.setState({
      openCurrencySelection: false
    });
  };

  onCurrencyChange = (item, itemPosition) => {
    this.setState({
      selectedCurrency: item
    });
  };

  openSortTypeSelectionModal = () => {
    this.setState({
      openSortTypeSelection: true
    });
  };

  closeSortTypeSelectionModal = () => {
    this.setState({
      openSortTypeSelection: false
    });
  };

  onSortTypeChange = (item, itemPosition) => {
    this.setState({
      selectedSortType: item
    });
  };

  closeHighAlertAmountModal = () => {
    this.setState({
      openHighAlertAmountView: false
    });
  };

  openHighAlertAmountModal = () => {
    this.setState({
      openHighAlertAmountView: true
    });
  };

  render() {
    const {
      selectedTotalType,
      selectedCurrency,
      openCurrencySelection,
      openExpenseTypeSelection,
      totalType,
      supportedCurrencies,
      selectedSortType,
      availableSortType,
      openSortTypeSelection,
      highAlertAmount,
      openHighAlertAmountView
    } = this.state;

    return (
      <View style={styles.settingsWrapper}>
        <Popover
          isVisible={openExpenseTypeSelection}
          title='View Total as'
          pickerData={totalType}
          selectedPickerValue={selectedTotalType}
          onCloseAction={() => this.closeExpenseTypeSelectionModal()}
          setPickerValue={itemValue => this.onTotalTypeChange(itemValue)}
        />

        <Popover
          isVisible={openCurrencySelection}
          title='Set default currency'
          pickerData={supportedCurrencies}
          selectedPickerValue={selectedCurrency}
          onCloseAction={() => this.closeCurrencyModal()}
          setPickerValue={itemValue => this.onCurrencyChange(itemValue)}
        />

        <Popover
          isVisible={openSortTypeSelection}
          title='Set Sort type'
          pickerData={availableSortType}
          selectedPickerValue={selectedSortType}
          onCloseAction={() => this.closeSortTypeSelectionModal()}
          setPickerValue={itemValue => this.onSortTypeChange(itemValue)}
        />

        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Preferences</Text>
        </View>
        <KeyboardAvoidingView behavior='position'>
          <ScrollView style={styles.settingsList}>
            <SettingsRow
              title='View Total as'
              onPressAction={() => this.openExpenseTypeSelectionModal()}
              defaultValue={selectedTotalType}
            />
            <SettingsRow
              title='Default Currency'
              defaultValue={selectedCurrency}
              onPressAction={() => this.openCurrencyModal()}
            />
            <SettingsRow
              title='Sort Subscription'
              defaultValue={selectedSortType}
              onPressAction={() => this.openSortTypeSelectionModal()}
            />

            <View style={styles.row}>
              <Text style={styles.rowLabel}>High Alert Amount</Text>
              <TextInput
                allowFontScaling={true}
                maxLength={3}
                returnKeyType='done'
                keyboardType={'numeric'}
                onChangeText={highAlertAmount =>
                  this.setState({
                    highAlertAmount
                  })
                }
                value={highAlertAmount}
                style={styles.rowField}
              />
            </View>

            <SettingsRow
              onPressAction={() => this.openAboutScreen()}
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
