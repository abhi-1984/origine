import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import SubscriptionRow from '../components/SubscriptionRow';
import availableSubscriptions from '../utils/availableSubscriptions';
import FooterButton from '../components/FooterButton';
import HeaderView from '../components/HeaderView';
import EmptyList from '../components/EmptyList';

export default function Home({ navigation }) {
  //Redux
  const subscriptionsData = useSelector(state => state.subscriptionsReducer);
  const defaultCurrencyData = useSelector(
    state => state.setDefaultCurrencyReducer
  );
  const defaultSortType = useSelector(state => state.setDefaultSortTypeReducer);
  const defaultHighAlertAmount = useSelector(
    state => state.setDefaultHighAlertAmountReducer
  );

  //State
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //Navigation
  handleAddSubscriptionView = () => {
    navigation.push('AddSubscription');
  };

  prepareForSendingData = item => {
    let index = subscriptions.indexOf(item);
    return {
      pageTitle: 'Edit Subscription',
      name: item.name,
      logo: item.logo,
      amount: item.amount,
      firstBillDate: item.firstBillDate,
      billingCycle: item.billingCycle,
      mode: 'edit',
      index: index
    };
  };

  openFormView = item => {
    navigation.navigate('FormView', { pageData: prepareForSendingData(item) });
  };

  //useEffect
  useEffect(() => {
    setSubscriptions(subscriptionsData);
  }, [subscriptions]);

  return (
    <View style={styles.homeWrapper}>
      <HeaderView
        subscriptionsCount={subscriptions.length}
        openAddSubscriptionView={() => this.handleAddSubscriptionView()}
      />
      {console.log(
        'subscriptions are>>>',
        subscriptions,
        'and default currency is ',
        defaultCurrencyData,
        'and default sort type is',
        defaultSortType,
        'and default high alert amount is ',
        defaultHighAlertAmount
      )}
      <FlatList
        contentContainerStyle={[
          styles.listView,
          subscriptions.length < 1 && { marginBottom: 0 }
        ]}
        data={[...subscriptions]}
        ListEmptyComponent={EmptyList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SubscriptionRow
            onPressAction={() => this.openFormView(item)}
            data={item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    justifyContent: 'space-between'
  },
  listView: {
    marginBottom: 65,
    flex: 1
  }
});
