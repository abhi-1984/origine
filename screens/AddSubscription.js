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
import AddSubscriptionRow from '../components/AddSubscriptionRow';

export default class AddSubscription extends React.Component {
  state = {
    subscriptions: [
      {
        key: 1,
        name: 'Spotify',
        color: '#1ED760'
      },
      {
        key: 2,
        name: 'Apple Music',
        color: '#000'
      },
      {
        key: 3,
        name: 'Webflow',
        color: '#484BFF'
      },
      {
        key: 4,
        name: 'Sketch',
        color: '#FDA900'
      },
      {
        key: 5,
        name: 'Figma',
        color: '#FF7262'
      },
      {
        key: 6,
        name: 'Framer',
        color: '#0057ff'
      },
      {
        key: 7,
        name: 'Dropbox',
        color: '#0E2086'
      },
      {
        key: 8,
        name: 'Dribbble',
        color: '#E74D89'
      },
      {
        key: 9,
        name: 'Netflix',
        color: '#C40000'
      },
      {
        key: 10,
        name: 'Amazon Prime',
        color: '#00ADEE'
      }
    ]
  };

  handleBackToScreen = () => {
    this.props.navigation.goBack();
  };

  prepareForSendingData = item => {
    return {
      pageTitle: 'Add Subscription',
      name: item.name,
      color: item.color,
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

  componentDidMount() {
    let pageData = this.props.navigation.getParam('subscriptionsAdded', []);

    let newArray = this.state.subscriptions.filter(
      o => !pageData.find(o2 => o.name === o2.name)
    );

    this.setState({
      subscriptions: newArray
    });
  }

  getRandomColor = () => {
    const colors = [
      '#fa983a',
      '#82ccdd',
      '#78e08f',
      '#1e3799',
      '#b71540',
      '#f8c291'
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
    const { subscriptions } = this.state;
    return (
      <View style={styles.addSubscriptionWrapper}>
        <PageTitle
          label='Add Subscription'
          goBack={() => this.handleBackToScreen()}
        />
        <FlatList
          contentContainerStyle={styles.listView}
          data={[...subscriptions]}
          keyExtractor={item => item.key.toString()}
          renderItem={({ item }) => (
            <AddSubscriptionRow
              handlePress={() => this.openFormViewForDefaultSubscription(item)}
              label={item.name}
              color={item.color}
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
