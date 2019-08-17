import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default function Popover({
  isVisible,
  title,
  pickerData,
  setPickerValue,
  selectedPickerValue,
  onCloseAction
}) {
  return (
    <Modal
      onBackdropPress={onCloseAction}
      onSwipeComplete={onCloseAction}
      swipeDirection={['up', 'left', 'right', 'down']}
      isVisible={isVisible}
      style={styles.bottomModal}
    >
      <View style={styles.popupView}>
        <View style={styles.popupHeader}>
          <Text style={styles.popupTitle}>{title}</Text>
          <TouchableOpacity style={styles.closeView} onPress={onCloseAction}>
            <Text>close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupBody}>
          <Picker
            selectedValue={selectedPickerValue}
            style={styles.pickerView}
            onValueChange={itemValue => setPickerValue(itemValue)}
          >
            {pickerData.map((option, index) => {
              return <Picker.Item key={index} label={option} value={option} />;
            })}
          </Picker>
          <TouchableOpacity onPress={onCloseAction} style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popupView: {
    width: '100%',
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 20
  },
  bottomModal: {
    width: SCREEN_WIDTH - 20,
    justifyContent: 'flex-end',
    marginBottom: 10,
    alignContent: 'center',
    alignSelf: 'center'
  },
  popupHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.08)',
    borderBottomWidth: 1
  },

  popupTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  closeView: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#EDEDF0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  popupBody: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectionView: {
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    width: '100%',
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectionViewText: {
    fontSize: 16,
    lineHeight: 24
  },
  doneButton: {
    backgroundColor: '#000',
    height: 50,
    width: 280,
    marginHorizontal: 30,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  doneButtonText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#fff'
  },
  pickerView: {
    width: '100%',
    flex: 1
  }
});
