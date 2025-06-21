import { View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Tabs, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '../../firebase'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Mymodal from '../components/modal';
const TabsIcon = ({ icon, color, focused,extraStyles }) => (
  <View>
    <Image
      source={icon}
      resizeMode="contain"
      style={[extraStyles,{
        width: 20,
        height: 20,
        tintColor: focused ? '#000066' : color,
      }]}
    />
  </View>
);
const auth = FIREBASE_AUTH;
const TabsLayout = () => {
  const [modaVisible, setModalVisible] = useState(false);
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
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabsIcon
                icon={require('../assets/icons/home.png')}
                color={color}
                focused={focused}
              />
            ),

            
          }}
        />
<Tabs.Screen
          name="friends"
          options={{
            title: 'friends',
            headerShown: false,
           
            tabBarIcon: ({ focused, color }) => (
              <TabsIcon
                icon={require('../assets/icons/friends.png')}
                color={color}
                focused={focused}
                extraStyles={{with:40,height:40}}

              />
            ),
           

              headerSearchBarOptions:{
             headerIconColor:'#8686DB',
              placeholder:'Seach for a friend',
              
            },
            
          
            headerStyle:{
              backgroundColor:'#8686DB',
              alignItems:'center',
              
            },
            
        
            headerTintColor:'white',
          }}
/>
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default TabsLayout;
