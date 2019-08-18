import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import SubscriptionRow from '../components/SubscriptionRow';
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

  getAlphabeticallySortedData = list => {
    const sortedData = list.sort((a, b) =>
      a.name > b.name
        ? 1
        : a.name === b.name
        ? a.amount > b.amount
          ? 1
          : -1
        : -1
    );

    return sortedData;
  };

  //Navigation
  handleAddSubscriptionView = () => {
    navigation.push('AddSubscription', {
      subscriptionsAdded: subscriptionsData
    });
  };

  prepareForSendingData = item => {
    let index = subscriptionsData.indexOf(item);
    return {
      pageTitle: 'Edit Subscription',
      name: item.name,
      logo: item.logo,
      amount: item.amount,
      firstBillDate: item.firstBillDate,
      billingCycle: item.billingCycle,
      mode: 'edit',
      index: index,
      color: item.color,
      custom: item.isCustomSubscription
    };
  };

  openFormView = item => {
    console.log('item is>>>', item);
    navigation.navigate('FormView', { pageData: prepareForSendingData(item) });
  };

  //useEffect
  useEffect(() => {
    setSubscriptions(subscriptionsData);
  }, [subscriptions]);

  return (
    <View style={styles.homeWrapper}>
      <HeaderView
        subscriptionsCount={subscriptionsData.length}
        openAddSubscriptionView={() => this.handleAddSubscriptionView()}
      />
      <FlatList
        contentContainerStyle={[
          styles.listView,
          subscriptionsData.length < 1 && { marginBottom: 0 }
        ]}
        data={[
          ...getAlphabeticallySortedData(subscriptionsData, 'Alphabetical')
        ]}
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
    paddingBottom: 65
  }
});
