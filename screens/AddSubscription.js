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

  state = {
    subscriptions: [
      {
        key: 1,
        name: 'Spotify',
        logo: require('../assets/Spotify.png')
      },
      {
        key: 2,
        name: 'Apple Music',
        logo: require('../assets/Apple.png')
      },
      {
        key: 3,
        name: 'Webflow',
        logo: require('../assets/Webflow.png')
      },
      {
        key: 4,
        name: 'Sketch',
        logo: require('../assets/Sketch.png')
      },
      {
        key: 5,
        name: 'Figma',
        logo: require('../assets/Figma.png')
      },
      {
        key: 6,
        name: 'Framer',
        logo: require('../assets/FramerX.png')
      },
      {
        key: 7,
        name: 'Dropbox',
        logo: require('../assets/Dropbox.png')
      },
      {
        key: 8,
        name: 'Dribbble',
        logo: require('../assets/Dribbble.png')
      },
      {
        key: 9,
        name: 'Netflix',
        logo: require('../assets/Netflix.png')
      },
      {
        key: 10,
        name: 'Amazon Prime',
        logo: require('../assets/AmazonPrime.png')
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

  componentDidMount() {
    let pageData = this.props.navigation.getParam('subscriptionsAdded', []);
    console.log('already added subscriptions are>>>>', pageData);

    let newArray = this.state.subscriptions.filter(
      o => !pageData.find(o2 => o.name === o2.name)
    );

    this.setState({
      subscriptions: newArray
    });
  }

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
