import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import PageTitle from '../components/PageTitle';

export default class About extends React.Component {
  static navigationOptions = {
    header: null
  };

  handleBackToScreen = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {} = this.props;
    return (
      <View style={styles.aboutWrapper}>
        <PageTitle label='About' goBack={() => this.handleBackToScreen()} />
        <View style={styles.aboutBody}>
          <Image
            style={styles.aboutImage}
            source={require('../assets/aboutImage.png')}
          />
          <Text style={styles.pageDescription}>
            Origine is a minimal app to track your subscriptions and made by
            Abhi
          </Text>
          <Text style={styles.pageCaption}>Designed in India</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aboutWrapper: {
    flex: 1
  },

  aboutBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 30
  },
  aboutImage: {
    marginBottom: 30
  },
  pageDescription: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '300',
    marginBottom: 30,
    textAlign: 'center'
  },
  pageCaption: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.3
  }
});
