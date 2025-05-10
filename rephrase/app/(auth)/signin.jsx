import { View, StyleSheet, Image ,Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


import { FormField } from '../components/form';
import CustomButton from '../components/CustomButton';
import { Link, router } from 'expo-router';

import { useNavigation } from 'expo-router';
// import jwt_decode from 'jwt-decode';


const SignIn = () => {

  const [form, setForm] = useState({ email: '', password: '' });
    
  const [loading, setLoading] = useState(false);
  const [userId, setUserId]=useState('');
  const url='http://192.168.168.208:3001/';

  // const handleSubmit = async () => {
  //   if (!form.email || !form.password) {
  //     Alert.alert('Error', 'Please fill in both email and password.');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await fetch(`${url}customer/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(form),
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       const data = await response.json();
  //       Alert.alert('Success', 'Login successful!');
  //       // Save the token and navigate to the home page
        
  //       await AsyncStorage.setItem('token', data.token);
  //       const userID=(data.user_id);
  //       //console.log("user id = ",data.user.user_id);
  //       const userid=data.user.user_id;
    
  //     router.push(`/profile?userid=${userid}`);
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
            onPress={()=>{router.push('/chat')}}
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
