import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import PageTitle from '../components/PageTitle';
import FooterButton from '../components/FooterButton';
import availableSubscriptions from '../utils/availableSubscriptions';
import AddSubscriptionRow from '../components/AddSubscriptionRow';

export default class AddSubscription extends React.Component {
  static navigationOptions = {
    header: null
  };

  handleBackToScreen = () => {
    this.props.navigation.goBack();
  };

  prepareForSendingData = item => {
    return {
      pageTitle: 'Add Subscription',
      name: item.name,
      logo: item.logo,
      amount: '0',
      firstBillDate: 'Aug 17, 2019',
      billingCycle: 'Monthly',
      mode: 'add'
    };
  };

  openFormViewForDefaultSubscription = item => {
    this.props.navigation.push('FormView', {
      pageData: this.prepareForSendingData(item)
    });
  };

  getRandomColor = () => {
    const colors = [
      '#000000',
      '#0057ff',
      '#4B96E9',
      '#5D4BE9',
      '#1ED760',
      '#D71E6C'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };

  openFormViewForCustomSubscription = () => {
    const data = {
      pageTitle: 'Add Subscription',
      name: '',
      color: this.getRandomColor(),
      amount: '0',
      firstBillDate: 'Aug 17, 2019',
      billingCycle: 'Monthly',
      mode: 'add',
      custom: true
    };
    this.props.navigation.push('FormView', {
      pageData: data
    });
  };

  render() {
    return (
      <View style={styles.addSubscriptionWrapper}>
        <PageTitle
          label='Add Subscription'
          goBack={() => this.handleBackToScreen()}
        />
        <FlatList
          contentContainerStyle={styles.listView}
          data={[...availableSubscriptions]}
          keyExtractor={item => item.key.toString()}
          renderItem={({ item }) => (
            <AddSubscriptionRow
              handlePress={() => this.openFormViewForDefaultSubscription(item)}
              label={item.name}
              logo={item.logo}
            />
          )}
        />

        <FooterButton
          onPressAction={() => this.openFormViewForCustomSubscription()}
          label='Create custom subscription'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addSubscriptionWrapper: {
    flex: 1
  }
});
