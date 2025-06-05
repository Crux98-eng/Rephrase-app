import { View, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Tabs, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FIREBASE_AUTH} from '../../firebase'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TabsIcon = ({ icon, color, focused }) => (
  <View>
    <Image
      source={icon}
      resizeMode="contain"
      style={{
        width: 20,
        height: 20,
        tintColor: focused ? '#000066' : color,
      }}
    />
  </View>
);
const auth = FIREBASE_AUTH;
const TabsLayout = () => {
  
  const logout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      await AsyncStorage.removeItem('token'); // Clear token from storage
      router.replace('/signin'); // Navigate to signin screen
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Try again.');
      console.error('Logout error:', error);
    }
  };

  return (
    <GestureHandlerRootView>
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <TabsIcon
              icon={require('../assets/icons/home.png')}
              color={color}
              focused={focused}
            />
          ),
             headerRight: () => (
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                right: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={logout}
            >
              <Image
                source={require('../assets/icons/logout.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#000066',
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
    </GestureHandlerRootView>
  );
};

export default TabsLayout;
