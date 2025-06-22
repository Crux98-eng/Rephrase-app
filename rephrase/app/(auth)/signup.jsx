import { View, StyleSheet, Text, Image,Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';


import { FormField } from '../components/form';
import  CustomButton  from '../components/CustomButton'
import { Link, router } from 'expo-router';


const auth =  FIREBASE_AUTH ;

const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '',name:'',phone:'' });
  const [loading, setLoading] = useState(false);
  const url = 'https://rephrase-chatapi.onrender.com'

  const handleSubmit = async () => {
  if (!form.email || !form.password ||!form.name || !form.phone) {
    Alert.alert('Error', 'Please fill in all the fields.');
    return;
  }

  setLoading(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
    const token = await userCredential.user.getIdToken();
    // console.log('                 \n',token,'\n           ');
    const response = await fetch(`${url}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
      fullName:form.name,
     
   
      }),
    });

    const data = await response.json();
  
//console.log("\n\ndata  = ============" ,data );
    if (response.ok) {
      Alert.alert('Success', 'Registration successful!');
      router.push('/signin');
    } else {
      Alert.alert('Error', 'Something went wrong.');
    }
  } catch (error) {
    //console.error('Registration error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again later.');
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView>
      <ScrollView style={styles.outer}>
        <View>
          <Image resizeMode="contain" source={require('../assets/icons/logo_primary.png')} style={styles.img} />
        </View>

        <View>
          <Text style={styles.text}>Sign Up</Text>
          <FormField
            title="User Name"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, name: e })}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            secureTextEntry
          />
          <FormField
            title="phone"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            keyboardType="phone"
          />

          <CustomButton
          styling={styles.btn}
            title={loading ? 'Registering...' : 'Sign Up'}
            onPress={handleSubmit}
            disabled={loading}

          />
         

          <View style={styles.onotherOption}>
            <Text style={styles.text1}>Already have an account?</Text>
            <Link href="/signin" style={styles.links}>
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  btn:{
 backgroundColor:'#FF6600',
  width:400,
  alignSelf:'center'
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
