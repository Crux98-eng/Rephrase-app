
// import { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
// import { router } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomButton from './components/CustomButton';

// export default function Page() {
//   const [checkingToken, setCheckingToken] = useState(true);

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('user');
//         console.log("user =========", token)
//         if (token) {
//           router.replace('/home'); // Redirect to home if token exists
//         }
//       } catch (error) {
//         console.error('Error checking token:', error);
//       } finally {
//         setCheckingToken(false); // Stop loading spinner
//       }
//     };

//     checkToken();
//   }, []);

//   if (checkingToken) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView>
//       <View style={{ flex: 1, alignItems: 'center', width: '100%', height: '100%' }}>
//         <Image source={require('./assets/images/onboardImage.png')} style={styles.imgs} />
//         <Text style={{ top: 2 }}></Text>

//         <View style={styles.btn}>
//           <CustomButton onPress={() => { router.push('/signin'); }} title='Get started' />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   imgs: {
//     width: 200,
//     height: 200,
//     top: 150,
//     resizeMode: 'contain',
//   },
//   btn: {
//     top: 250,
//   },
// });
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
//import jwt_decode from "jwt-decode";

import CustomButton from './components/CustomButton';

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Token decode error:', error);
    return false;
  }
};

export default function Page() {
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('user');

        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const token = userData.token || userData.idToken;

          if (token && isTokenValid(token)) {
            router.replace('/home');
            return;
          }
        }

        // No valid token found
        router.replace('/signin');
      } catch (error) {
        //console.error('Auth check failed:', error);
        router.replace('/signin');
      } finally {
        setCheckingToken(false);
      }
    };

    checkAuth();
  }, []);

  if (checkingToken) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={{ flex: 1, alignItems: 'center', width: '100%', height: '100%' }}>
        <Image source={require('./assets/images/onboardImage.png')} style={styles.imgs} />
        <View style={styles.btn}>
          <CustomButton onPress={() => router.push('/signin')} title='Get started' />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgs: {
    width: 200,
    height: 200,
    top: 150,
    resizeMode: 'contain',
  },
  btn: {
    top: 250,
  },
});
