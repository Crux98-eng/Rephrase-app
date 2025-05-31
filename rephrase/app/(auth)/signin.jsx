import { View, StyleSheet, Image ,Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase'

import { FormField } from '../components/form';
import CustomButton from '../components/CustomButton';
import { Link, router } from 'expo-router';

import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignIn = () => {

  const [form, setForm] = useState({ email: '', password: '' });
    
  const [loading, setLoading] = useState(false);
  const [userId, setUserId]=useState('');
   const auth = FIREBASE_AUTH;

  // const handleSubmit = async () => {

  //   if (!form.email || !form.password) {
  //     Alert.alert('Error', 'Please fill in both email and password.');
  //     return;
  //   }

  //   setLoading(true);
  //   try{
  //  const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
  //   const token = await userCredential.user.getIdToken();

  //  //console.log("\n\n", token ,"\n\n")

  //  const response = await fetch('http://192.168.197.200:8080/api/auth/me',
  //   {
  //  method:'GET',
  //  'Content-Type': 'application/json',
  //  Authorization: `Bearer ${token}`,
    
  // });
  // const data = response.json();
   
   
  //    if (response.ok) {
        
  //       Alert.alert('Success', 'Login successful!');
        
        
  //       await AsyncStorage.setItem('token', data.token);
  //       const userID=(data.user_id);
  //       console.log("user id = ",data.user.user_id);
  //       const userid=data.user.user_id;
    
  //     router.push('/home');
  //     } else {
  //       const errorText = await response.text();
  //       const errorMessage = response.headers.get('content-type')?.includes('application/json')
  //         ? JSON.parse(errorText)?.message
  //         : errorText;
  //       Alert.alert('Error', errorMessage || 'Invalid credentials');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     Alert.alert('Error', 'Something went wrong. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async () => {
  // Check if both email and password are provided
  if (!form.email || !form.password) {
    Alert.alert('Error', 'Please fill in both email and password.');
    return;
  }

  setLoading(true);

  try {
    // Authenticate user with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);

    // Get Firebase ID token
    const token = await userCredential.user.getIdToken();

    // Make request to your backend to verify/authenticate user
    const response = await fetch('http://192.168.197.200:8080/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the JSON response (only once!)
    const data = await response.json();

    if (response.ok) {
      // Successful login
      Alert.alert('Success', 'Login successful!');

      // Store token locally (optional if you're using Firebase token directly)
      //await AsyncStorage.setItem('token', data.token);

      // Extract and log user ID
     // const userID = data.user.user_id;
      //console.log("user id = ", userID);

      // Navigate to home screen
      router.push('/home');
    } else {
      // Handle error from server
      const errorText = await response.text();
      const errorMessage = response.headers.get('content-type')?.includes('application/json')
        ? JSON.parse(errorText)?.message
        : errorText;

      Alert.alert('Error', errorMessage || 'Invalid credentials');
    }
  } catch (error) {
    // Catch unexpected errors
    console.error('Login error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again later.');
  } finally {
    // Always stop the loading spinner
    setLoading(false);
  }
};

  return (
    <SafeAreaView>

      <ScrollView style={styles.outer}>
        {/* logo area */}
        <View>
          <Image resizeMode="contain" source={require('../assets/icons/logo_primary.png')} style={styles.img} />
        </View>

        <View>
          <Text style={styles.text}>Sign In</Text>
          <FormField
            title="Email"
            value={form.email.trim()}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password.trim()}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            secureTextEntry
          />

          <CustomButton
          styling={styles.buton}
            title={loading ? 'Logging in...' : 'Login'}
            onPress={()=>{handleSubmit()}}
            disabled={loading}
          />

          <View style={styles.onotherOption}>
            <Text style={styles.text1}>I don't have an account</Text>
            <Link href="/signup" style={styles.links}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  buton:{
  backgroundColor:'#FF6600',
  width:350,
  left:12,
  },
  outer: {
    alignContents: 'center',
    marginTop: '0%',
    height: '100%',
    backgroundColor: '#1B0333',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'start',
    marginBottom: 20,
    marginLeft: 15,
  },
  onotherOption: {
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  links: {
    color: '#F6822F',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
    
  },
  text1: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
