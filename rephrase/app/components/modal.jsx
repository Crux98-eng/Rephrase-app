import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('window');

export default function Mymodal({ visible, onClose }) {
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropOpacity={0.7}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <Text style={{ marginBottom: 20 }}>This is a modal</Text>
        <Button title="CLOSE" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0, // removes default margin
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '70%',
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
});
