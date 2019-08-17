import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function EmptyList({ navigation }) {
  handleAddSubscriptionView = () => {
    navigation.push('AddSubscription');
  };

  return (
    <View style={styles.emptyListWrapper}>
      <Image
        style={styles.emptyListImage}
        source={require('../assets/emptyListImage.png')}
      />
      <Text style={styles.title}>No Subscriptions Added</Text>
      <Text style={styles.subtitle}>
        Add your first subscription by tapping the Add button below.
      </Text>
      <TouchableOpacity
        onPress={() => handleAddSubscriptionView()}
        style={styles.addButton}
      >
        <Text style={styles.addButtonLabel}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 40
  },

  emptyListImage: {
    marginBottom: 30
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    lineHeight: 32
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 30
  },

  addButton: {
    width: 120,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    lineHeight: 18,
    fontWeight: '600',
    color: '#fff'
  }
});
