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

  openFormView = item => {
    this.props.navigation.push('FormView', {
      pageData: this.prepareForSendingData(item)
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
              handlePress={() => this.openFormView(item)}
              label={item.name}
              logo={item.logo}
            />
          )}
        />

        <FooterButton
          onPressAction={() => this.openFormView()}
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
