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

  openFormView = () => {
    this.props.navigation.push('FormView');
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
              handlePress={() => this.openFormView()}
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
