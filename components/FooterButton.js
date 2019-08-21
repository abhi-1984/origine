import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FooterButton({ label, onPressAction, isDisabled }) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPressAction}
      style={[styles.footerButton, isDisabled ? { opacity: 0.5 } : 1]}
    >
      <Text style={styles.footerButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  footerButton: {
    width: '100%',
    zIndex: 2,
    height: 64,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06
  },
  footerButtonText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});
