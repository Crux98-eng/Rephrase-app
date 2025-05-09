import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton =({ title, onPress,style,bgcolor })=> {
  return (
    <TouchableOpacity 
    style={styles.button}
     onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
export default CustomButton;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000066',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 22,
    width: 300,
    marginLeft:15,
    marginRight:15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
