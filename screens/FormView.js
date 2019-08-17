import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Picker,
  Modal,
  Dimensions,
  DatePickerIOS
} from 'react-native';
import PageTitle from '../components/PageTitle';
import FooterButton from '../components/FooterButton';
import SettingsRow from '../components/SettingsRow';
import DateTimePicker from 'react-native-modal-datetime-picker';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default class FormView extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    pageData: {},
    name: '',
    logo: null,
    amount: '0',
    firstBillDate: null,
    billingCycle: 'Monthly',
    showBillingCyclePicker: false,
    billingCycleOptions: [
      'Daily',
      'Weekly',
      'Monthly',
      'Every 3 Months',
      'Every 6 months',
      'Yearly'
    ],
    showFirstBillDatePicker: false
  };

  componentDidMount() {
    const pageData = this.props.navigation.getParam('pageData', {});
    this.setState({
      name: pageData.name,
      logo: pageData.logo,
      amount: pageData.amount,
      billingCycle: pageData.billingCycle
    });
  }

  openDatePicker = () => {
    this.setState({
      showFirstBillDatePicker: true
    });
  };

  closeDatePicker = () => {
    this.setState({
      showFirstBillDatePicker: false
    });
  };

  openPreviousScreen = () => {
    this.props.navigation.goBack();
  };

  closeBillingCycleModal = () => {
    this.setState({
      showBillingCyclePicker: false
    });
  };

  openBillingCycleModal = () => {
    this.setState({
      showBillingCyclePicker: true
    });
  };

  formatDate = selectedDate => {
    let currentDate = selectedDate;

    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();

    let finalDate = date + '-' + (month + 1) + '-' + year;
    return finalDate;
  };

  handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    this.setState({
      firstBillDate: date
    });
    this.closeDatePicker();
  };

  render() {
    const {
      name,
      amount,
      firstBillDate,
      billingCycle,
      logo,
      showBillingCyclePicker,
      billingCycleOptions,
      showFirstBillDatePicker
    } = this.state;

    return (
      <View style={styles.formView}>
        <PageTitle
          goBack={() => this.openPreviousScreen()}
          label={'Add Subscription'}
        />
        <ScrollView contentContainerStyle={styles.formWrapper}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.name}>{name}</Text>
          <TextInput
            allowFontScaling={true}
            returnKeyType='done'
            keyboardType={'numeric'}
            onChangeText={amount => this.setState({ amount })}
            placeholder={amount && amount.toString()}
            style={styles.amountField}
          />
          <SettingsRow
            title='First Bill'
            onPressAction={() => {
              this.openDatePicker();
            }}
            defaultValue={firstBillDate}
          />
          <SettingsRow
            title='Billing Cycle'
            onPressAction={() => this.openBillingCycleModal()}
            defaultValue={billingCycle}
          />

          <DateTimePicker
            isVisible={showFirstBillDatePicker}
            onConfirm={date => this.handleDatePicked(this.formatDate(date))}
            onCancel={() => this.closeDatePicker()}
          />

          <Modal
            animationType='fade'
            transparent={true}
            visible={showBillingCyclePicker}
          >
            <View style={styles.overlay}>
              <View style={styles.popupView}>
                <View style={styles.popupHeader}>
                  <Text style={styles.popupTitle}>Select Billing Cycle</Text>
                  <TouchableOpacity
                    style={styles.closeView}
                    onPress={() => {
                      this.closeBillingCycleModal();
                    }}
                  >
                    <Text>close</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.popupBody}>
                  <Picker
                    selectedValue={billingCycle}
                    style={styles.pickerView}
                    onValueChange={(itemValue, itemPosition) =>
                      this.setState({
                        billingCycle: itemValue
                      })
                    }
                  >
                    {billingCycleOptions.map((option, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={option}
                          value={option}
                        />
                      );
                    })}
                  </Picker>

                  <TouchableOpacity
                    onPress={() => this.closeBillingCycleModal()}
                    style={styles.doneButton}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
        <FooterButton label='Save' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    position: 'relative'
  },
  formWrapper: {
    alignItems: 'center',
    padding: 30
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 15,
    marginBottom: 10
  },
  name: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '600'
  },
  amountField: {
    width: 150,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    borderBottomWidth: 1,
    width: '100%'
  },
  pickerView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  rowLabel: {
    fontSize: 16
  },
  rowField: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)'
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
    color: 'rgba(0,0,0,0.6)'
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
