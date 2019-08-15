import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import PageTitle from '../components/PageTitle';
import FooterButton from '../components/FooterButton';
import SettingsRow from '../components/SettingsRow';

export default class FormView extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    amount: '0'
  };

  openPreviousScreen = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { amount } = this.state;

    return (
      <View style={styles.formView}>
        <PageTitle
          goBack={() => this.openPreviousScreen()}
          label='Add Subscription'
        />
        <ScrollView contentContainerStyle={styles.formWrapper}>
          <Image
            style={styles.logo}
            source={require('../assets/FramerX.png')}
          />
          <TextInput
            allowFontScaling={true}
            returnKeyType='done'
            keyboardType={'numeric'}
            onChangeText={amount => this.setState({ amount })}
            value={amount}
            style={styles.amountField}
          />

          <SettingsRow title='Name' defaultValue='Spotify' />
          <SettingsRow title='First Bill' defaultValue='4th May 2019' />
          <SettingsRow title='Billing Cycle' defaultValue='Monthly' />
          <SettingsRow title='Remind me' defaultValue='2 days before' />
          <SettingsRow title='Currency' defaultValue='USD ($)' />
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
    marginVertical: 15
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
  }
});
