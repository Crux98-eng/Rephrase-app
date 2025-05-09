// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import {Image} from 'expo-image'
// import icons from '../constants/icons'

// export const FormField = ({ title, value, handleChangeText, keyboardType, secureTextEntry }) => {

//   const [showPassword,setshowPassword] =useState(false)
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>{title}</Text>
//       <View style={styles.inputContainer}>
//       <TextInput
//         style={styles.input}
//         value={value}
//         onChangeText={handleChangeText}
//         keyboardType={keyboardType}
//         secureTextEntry={title==='Password' && !showPassword}
//         placeholder={`Enter your ${title.toLowerCase()}`}
//         placeholderTextColor="#aaa"

//       />
     
//       {title === 'Password' && (
//           <TouchableOpacity onPress={() => setshowPassword(!showPassword)} style={styles.iconContainer}>
//             <Image
//               source={!showPassword ? icons.eye : icons.Eyeclose}
//               style={styles.icon}
//             />
//           </TouchableOpacity>
          
//         )}
//          </View>
    
       
//     </View>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
  
//   },
//   label: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 5,
//     marginLeft: 15,
//     marginRight:15,
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 12,
//     marginLeft: 15,
//     marginRight:15,
//     fontSize: 16,
//   },
//   iconContainer: {
//     padding: 10,
//     position: 'absolute',
//     right: 27,
//     top: 2,
//     zIndex: 1,
//     backgroundColor: '#fff',
   
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     tintColor: 'blue',
    
//   },
//   // inputContainer: {
//   //   flexDirection: 'row',
    
//   //   // alignItems: 'center',
//   //   marginLeft: 15,
//   //   marginRight: 15,
//   //   borderBottomWidth: 1,
//   //   borderBottomColor: '#ccc',
//   // },
// });
