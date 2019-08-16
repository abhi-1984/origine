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
    amount: '0',
    pageData: {}
  };

  componentDidMount() {
    this.setState({
      pageData: this.props.navigation.getParam('pageData', {})
    });
  }

  openPreviousScreen = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { amount, pageData } = this.state;

    return (
      <View style={styles.formView}>
        <PageTitle
          goBack={() => this.openPreviousScreen()}
          label={pageData.pageTitle}
        />
        {console.log('pagetitle is>>>>', pageData)}
        <ScrollView contentContainerStyle={styles.formWrapper}>
          <Image style={styles.logo} source={pageData.logo} />
          <TextInput
            allowFontScaling={true}
            returnKeyType='done'
            keyboardType={'numeric'}
            onChangeText={amount => this.setState({ amount })}
            placeholder={pageData.amount && pageData.amount.toString()}
            style={styles.amountField}
          />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Name</Text>
            <TextInput
              allowFontScaling={true}
              returnKeyType='done'
              keyboardType={'default'}
              onChangeText={name => this.setState({ pageData: { ...name } })}
              value={pageData.name}
              style={styles.rowField}
            />
          </View>
          <SettingsRow
            title='First Bill'
            defaultValue={pageData.firstBillDate}
          />
          <SettingsRow
            title='Billing Cycle'
            defaultValue={pageData.billingCycle}
          />
          <SettingsRow
            title='Remind me'
            defaultValue={`${pageData.reminder} days before`}
          />
          <SettingsRow title='Currency' defaultValue={pageData.currency} />
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
  rowLabel: {
    fontSize: 16
  },
  rowField: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)'
  }
});
