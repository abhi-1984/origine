import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import SubscriptionRow from '../components/SubscriptionRow';
import HeaderView from '../components/HeaderView';
import EmptyList from '../components/EmptyList';
import firebase from 'firebase';

export default function Home({ navigation }) {
  //Redux
  const subscriptionsData = useSelector(state => state.subscriptionsReducer);
  const defaultSortType = useSelector(state => state.setDefaultSortTypeReducer);

  //State
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
    navigation.navigate('FormView', { pageData: prepareForSendingData(item) });
  };

  useEffect(() => {
    var firebaseConfig = {
      apiKey: 'AIzaSyA3YhbzjgxVK41H5R1brbcpcekI0HRCsVQ',
      authDomain: 'origine-eddc3.firebaseapp.com',
      databaseURL: 'https://origine-eddc3.firebaseio.com',
      projectId: 'origine-eddc3',
      storageBucket: '',
      messagingSenderId: '686657402282',
      appId: '1:686657402282:web:6844f0d3e8d85039'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase
      .database()
      .ref('subscriptions')
      .on('value', data => {
        let jsonData = data.toJSON();
        let convertedArray = jsonData ? Object.values(jsonData) : [];
        setSubscriptions(convertedArray);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.homeWrapper}>
      {!isLoading ? (
        <View style={{ flex: 1 }}>
          <HeaderView
            subscriptionsCount={subscriptions.length}
            openAddSubscriptionView={() => this.handleAddSubscriptionView()}
          />
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
      ) : (
        <ActivityIndicator />
      )}
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
