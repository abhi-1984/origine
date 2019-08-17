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
  Dimensions,
  DatePickerIOS
} from 'react-native';
import PageTitle from '../components/PageTitle';
import FooterButton from '../components/FooterButton';
import SettingsRow from '../components/SettingsRow';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import Popover from '../components/Popover';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default class FormView extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    pageData: {},
    name: '',
    logo: null,
    amount: null,
    firstBillDate: '',
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
      firstBillDate: this.formatDate(new Date()),
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
    var month = currentDate.getMonth();
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

  onValueChange = (itemValue, itemPosition) => {
    this.setState({
      billingCycle: itemValue
    });
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
            placeholder='Amount'
            returnKeyType='done'
            keyboardType={'numeric'}
            onChangeText={amount => this.setState({ amount })}
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
            confirmTextIOS='Done'
            isVisible={showFirstBillDatePicker}
            onConfirm={date => this.handleDatePicked(this.formatDate(date))}
            onCancel={() => this.closeDatePicker()}
          />

          <Popover
            isVisible={showBillingCyclePicker}
            title='Billing Cycle'
            pickerData={billingCycleOptions}
            selectedPickerValue={billingCycle}
            onCloseAction={() => this.closeBillingCycleModal()}
            setPickerValue={itemValue => this.onValueChange(itemValue)}
          />
        </ScrollView>

        <FooterButton isDisabled={amount === ''} label='Save' />
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
  }
});
