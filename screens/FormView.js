import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle';
import FooterButton from '../components/FooterButton';
import SettingsRow from '../components/SettingsRow';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Popover from '../components/Popover';
import {
  setSubscriptionsData,
  removeSubscriptionData,
  updateSubscriptionData
} from '../actions';
import firebase from 'firebase';
import Constants from 'expo-constants';

const deviceID = Constants.installationId;

export default function FormView({ navigation }) {
  //redux
  const dispatch = useDispatch();

  //state
  const [mode, setMode] = useState(null);
  const [index, setIndex] = useState(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);
  const [firstBillDate, setFirstBillDate] = useState('');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [billingCycleOptions, setBillingCycleOptions] = useState([
    'Daily',
    'Weekly',
    'Monthly',
    'Every 3 Months',
    'Every 6 months',
    'Yearly'
  ]);
  const [firstBillDatePicker, setFirstBillDatePicker] = useState(false);
  const [billingCyclePicker, setBillingCyclePicker] = useState(false);
  const [isCustomSubscriptionForm, setCustomSubscriptionForm] = useState(false);
  const [color, setColor] = useState('#000');

  useEffect(() => {
    const pageData = navigation.getParam('pageData', {});

    setName(pageData.name);

    setAmount(pageData.amount);
    setFirstBillDate(pageData.firstBillDate);
    setBillingCycle(pageData.billingCycle);
    setMode(pageData.mode);
    setIndex(pageData.index);
    setCustomSubscriptionForm(pageData.custom);
    setColor(pageData.color);
  }, []);

  openDatePicker = () => {
    setFirstBillDatePicker(true);
  };

  closeDatePicker = () => {
    setFirstBillDatePicker(false);
  };

  openPreviousScreen = () => {
    navigation.goBack();
  };

  closeBillingCycleModal = () => {
    setBillingCyclePicker(false);
  };

  openBillingCycleModal = () => {
    setBillingCyclePicker(true);
  };

  formatDate = selectedDate => {
    let currentDate = selectedDate;

    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();

    let finalDate = date + '-' + (month + 1) + '-' + year;
    return finalDate;
  };

  handleDatePicked = date => {
    setFirstBillDate(date);
    this.closeDatePicker();
  };

  onValueChange = (itemValue, itemPosition) => {
    setBillingCycle(itemValue);
  };

  addSubscriptionsData = () => {
    const data = {
      name: name,
      amount: amount,
      billingCycle: billingCycle,
      firstBillDate: firstBillDate,
      color: color,
      isCustomSubscription: isCustomSubscriptionForm ? true : false
    };

    firebase
      .database()
      .ref(`${deviceID}/subscriptions/${name}`)
      .set(data);

    dispatch(setSubscriptionsData(data));
    navigation.navigate('Home');
  };

  removeSubscription = index => {
    dispatch(removeSubscriptionData(index));
    firebase
      .database()
      .ref(`${deviceID}/subscriptions/${name}`)
      .remove();
    navigation.navigate('Home');
  };

  updateSubscription = index => {
    const data = {
      name: name,
      amount: amount,
      billingCycle: billingCycle,
      firstBillDate: firstBillDate,
      index: index,
      color: color,
      isCustomSubscription: isCustomSubscriptionForm ? true : false
    };
    dispatch(updateSubscriptionData(data));
    firebase
      .database()
      .ref(`${deviceID}/subscriptions/${name}`)
      .update(data);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.formView}>
      <PageTitle
        goBack={() => this.openPreviousScreen()}
        label={mode === 'edit' ? `Edit Subscription` : 'Add Subscription'}
      />
      <ScrollView contentContainerStyle={styles.formWrapper}>
        <View style={[styles.colorLogo, { backgroundColor: color }]} />

        {!isCustomSubscriptionForm && <Text style={styles.name}>{name}</Text>}

        <TextInput
          allowFontScaling={true}
          placeholder='Amount'
          value={amount > 0 ? amount : ''}
          returnKeyType='done'
          keyboardType={'numeric'}
          onChangeText={amount => setAmount(amount)}
          style={styles.amountField}
        />

        {isCustomSubscriptionForm && (
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Name</Text>
            <TextInput
              allowFontScaling={true}
              maxLength={15}
              returnKeyType='done'
              onChangeText={name => {
                setName(name);
              }}
              placeholder='Enter name'
              value={name}
              style={styles.rowField}
            />
          </View>
        )}

        <SettingsRow
          title='First Bill'
          onPressAction={() => {
            openDatePicker();
          }}
          defaultValue={firstBillDate}
        />
        <SettingsRow
          title='Billing Cycle'
          onPressAction={() => openBillingCycleModal()}
          defaultValue={billingCycle}
        />

        <DateTimePicker
          confirmTextIOS='Done'
          isVisible={firstBillDatePicker}
          confirmTextStyle={{ fontWeight: '700' }}
          titleStyle={{ fontSize: 16, fontWeight: '600', color: '#000' }}
          cancelTextStyle={{ color: '#DD1F2A' }}
          onConfirm={date => handleDatePicked(formatDate(date))}
          onCancel={() => closeDatePicker()}
        />

        <Popover
          isVisible={billingCyclePicker}
          title='Billing Cycle'
          pickerData={billingCycleOptions}
          selectedPickerValue={billingCycle}
          onCloseAction={() => closeBillingCycleModal()}
          setPickerValue={itemValue => onValueChange(itemValue)}
        />

        {mode === 'edit' && (
          <View style={styles.deleteActionRow}>
            <TouchableOpacity
              onPress={() => removeSubscription(index)}
              style={styles.deleteAction}
            >
              <Text style={styles.deleteActionText}>Remove Subscription</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <FooterButton
        onPressAction={() =>
          mode === 'edit' ? updateSubscription(index) : addSubscriptionsData()
        }
        isDisabled={
          amount <= 0 ||
          (isCustomSubscriptionForm && name === '' && amount <= 0)
        }
        label={mode === 'edit' ? 'Save Changes' : 'save'}
      />
    </View>
  );
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
  colorLogo: {
    width: 60,
    height: 60,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 30
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
  },
  deleteActionRow: {
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteActionText: {
    color: '#DD1F2A',
    fontSize: 16
  }
});
