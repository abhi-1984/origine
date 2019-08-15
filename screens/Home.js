import React from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import SubscriptionRow from '../components/SubscriptionRow';
import availableSubscriptions from '../utils/availableSubscriptions';
import FooterButton from '../components/FooterButton';
import HeaderView from '../components/HeaderView';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {}

  handleAddSubscriptionView = () => {
    this.props.navigation.push('AddSubscription');
  };

  openFormView = () => {
    this.props.navigation.push('FormView');
  };

  render() {
    return (
      <View style={styles.homeWrapper}>
        <HeaderView
          openAddSubscriptionView={() => this.handleAddSubscriptionView()}
        />
        <FlatList
          contentContainerStyle={styles.listView}
          data={[...availableSubscriptions]}
          keyExtractor={item => item.key.toString()}
          renderItem={({ item }) => (
            <SubscriptionRow
              onPressAction={() => this.openFormView()}
              data={item}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeWrapper: {
    justifyContent: 'space-between',
    flex: 1
  },
  listView: {
    marginBottom: 65
  }
});
