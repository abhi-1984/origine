import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
  Picker
} from 'react-native';
import SettingsRow from '../components/SettingsRow';
import Version from '../components/Version';
import { Ionicons } from '@expo/vector-icons';

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
      {
        symbol: '$',
        code: 'AUD'
      },
      {
        symbol: 'лв.',
        code: 'BGN'
      },
      {
        symbol: 'R$',
        code: 'BRL'
      },
      {
        symbol: '$',
        code: 'CAD'
      },
      {
        symbol: 'CHF',
        code: 'CHF'
      },
      {
        symbol: 'CN¥',
        code: 'CNY'
      },
      {
        symbol: 'Kč',
        code: 'CZK'
      },
      {
        symbol: 'kr',
        code: 'DKK'
      },
      {
        symbol: '€',
        code: 'EUR'
      },
      {
        symbol: '£',
        code: 'GBP'
      },
      {
        symbol: '$',
        code: 'HKD'
      },
      {
        symbol: 'kn',
        code: 'HRK'
      },
      {
        symbol: 'Ft',
        code: 'HUF'
      },
      {
        symbol: 'Rp',
        code: 'IDR'
      },
      {
        symbol: '₪',
        code: 'ILS'
      },
      {
        symbol: '₹',
        code: 'INR'
      },
      {
        symbol: 'kr',
        code: 'ISK'
      },
      {
        symbol: '￥',
        code: 'JPY'
      },
      {
        symbol: '₩',
        code: 'KRW'
      },
      {
        symbol: '$',
        code: 'MXN'
      },
      {
        symbol: 'RM',
        code: 'MYR'
      },
      {
        symbol: 'kr',
        code: 'NOK'
      },
      {
        symbol: '$',
        code: 'NZD'
      },
      {
        symbol: '₱',
        code: 'PHP'
      },
      {
        symbol: 'zł',
        code: 'PLN'
      },
      {
        symbol: 'RON',
        code: 'RON'
      },
      {
        symbol: 'руб.',
        code: 'RUB'
      },
      {
        symbol: 'kr',
        code: 'SEK'
      },
      {
        symbol: '$',
        code: 'SGD'
      },
      {
        symbol: '฿',
        code: 'THB'
      },
      {
        symbol: 'TL',
        code: 'TRY'
      },
      {
        symbol: '$',
        code: 'USD'
      },
      {
        symbol: 'R',
        code: 'ZAR'
      }
    ],
    selectedCurrency: '',
    openCurrencySelection: false,
    availableSortType: ['Max. Amount', 'Min. Amount', 'Alphabetical'],
    selectedSortType: '',
    openSortTypeSelection: true
  };

  componentDidMount() {
    this.setState({
      selectedTotalType: this.state.totalType[0],
      selectedCurrency: `${this.state.supportedCurrencies[0].code} (${
        this.state.supportedCurrencies[0].symbol
      })`,
      selectedSortType: this.state.availableSortType[0]
    });
  }

  openAboutScreen = () => {
    this.props.navigation.push('About');
  };

  openModal = () => {
    this.setState({
      openExpenseTypeSelection: true
    });
  };

  closeModal = () => {
    this.setState({
      openExpenseTypeSelection: false
    });
  };

  setSelectedTotalType = type => {
    this.setState({
      selectedTotalType: type
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
      openSortTypeSelection
    } = this.state;

    return (
      <View style={styles.settingsWrapper}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={openExpenseTypeSelection}
        >
          <View style={styles.overlay}>
            <View style={styles.popupView}>
              <View style={styles.popupHeader}>
                <Text style={styles.popupTitle}>View Total as</Text>
                <TouchableOpacity
                  style={styles.closeView}
                  onPress={() => {
                    this.closeModal();
                  }}
                >
                  <Text>close</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.popupBody}>
                <View>
                  {totalType.map((type, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.selectionView}
                        onPress={() => this.setSelectedTotalType(type)}
                      >
                        <Text style={styles.selectionViewText}>{type}</Text>

                        <Ionicons
                          style={styles.selectedIcon}
                          name='ios-checkmark'
                          size={30}
                          color={selectedTotalType === type ? '#000' : '#fff'}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <TouchableOpacity
                  onPress={() => this.closeModal()}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType='fade'
          transparent={true}
          visible={openCurrencySelection}
        >
          <View style={styles.overlay}>
            <View style={styles.popupView}>
              <View style={styles.popupHeader}>
                <Text style={styles.popupTitle}>View Total as</Text>
                <TouchableOpacity
                  style={styles.closeView}
                  onPress={() => {
                    this.closeCurrencyModal();
                  }}
                >
                  <Text>close</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.popupBody}>
                <Picker
                  selectedValue={selectedCurrency}
                  style={styles.pickerView}
                  onValueChange={(itemValue, itemPosition) =>
                    this.setState({
                      selectedCurrency: itemValue
                    })
                  }
                >
                  {supportedCurrencies.map(currency => {
                    return (
                      <Picker.Item
                        key={currency.code}
                        label={`${currency.code} (${currency.symbol})`}
                        value={`${currency.code} (${currency.symbol})`}
                      />
                    );
                  })}
                </Picker>

                <TouchableOpacity
                  onPress={() => this.closeCurrencyModal()}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType='fade'
          transparent={true}
          visible={openSortTypeSelection}
        >
          <View style={styles.overlay}>
            <View style={styles.popupView}>
              <View style={styles.popupHeader}>
                <Text style={styles.popupTitle}>View Total as</Text>
                <TouchableOpacity
                  style={styles.closeView}
                  onPress={() => {
                    this.closeSortTypeSelectionModal();
                  }}
                >
                  <Text>close</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.popupBody}>
                <Picker
                  selectedValue={selectedSortType}
                  style={styles.pickerView}
                  onValueChange={(itemValue, itemPosition) =>
                    this.setState({
                      selectedSortType: itemValue
                    })
                  }
                >
                  {availableSortType.map((type, index) => {
                    return (
                      <Picker.Item key={index} label={type} value={type} />
                    );
                  })}
                </Picker>

                <TouchableOpacity
                  onPress={() => this.closeSortTypeSelectionModal()}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Preferences</Text>
        </View>
        <ScrollView style={styles.settingsList}>
          <SettingsRow
            title='View Total as'
            onPressAction={() => this.openModal()}
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
          <SettingsRow title='High Alert Amount' defaultValue='$80.00' />
          <SettingsRow
            onPressAction={() => this.openAboutScreen()}
            title='About Us'
            defaultValue=''
          />
          <SettingsRow title='Rate Us' defaultValue='' />
          <Version versionNumber='v 1.0' />
        </ScrollView>
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
    backgroundColor: '#fff'
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
  popupView: {
    width: SCREEN_WIDTH - 40,
    marginBottom: 20,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  popupHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.08)',
    borderBottomWidth: 1
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  closeView: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#EDEDF0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  popupBody: {
    flex: 1,
    justifyContent: 'space-between'
  },
  selectionView: {
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    width: '100%',
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectionViewText: {
    fontSize: 16,
    lineHeight: 24
  },
  doneButton: {
    backgroundColor: '#000',
    height: 50,
    width: 280,
    marginHorizontal: 30,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  doneButtonText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#fff'
  },
  pickerView: {
    width: '100%',
    flex: 1
  }
});
