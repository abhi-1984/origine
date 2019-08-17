import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import SubscriptionRow from '../components/SubscriptionRow';
import availableSubscriptions from '../utils/availableSubscriptions';
import FooterButton from '../components/FooterButton';
import HeaderView from '../components/HeaderView';
import EmptyList from '../components/EmptyList';

export default function Home({ navigation }) {
  //Navigation
  handleAddSubscriptionView = () => {
    navigation.push('AddSubscription');
  };

  openFormView = item => {
    navigation.navigate('FormView', { pageData: item });
  };

  //Redux
  const subscriptionsData = useSelector(state => state.subscriptionsReducer);

  //State
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    setSubscriptions(subscriptionsData);
  }, [subscriptions]);

  return (
    <View style={styles.homeWrapper}>
      {console.log('subscriptions>>>', subscriptions)}
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
        keyExtractor={item => item.key.toString()}
        ListEmptyComponent={EmptyList}
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
