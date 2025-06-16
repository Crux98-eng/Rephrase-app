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
            headerShown: true,
            tabBarIcon: ({ focused, color }) => (
              <TabsIcon
                icon={require('../assets/icons/home.png')}
                color={color}
                focused={focused}
              />
            ),

            headerRight: () => (
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',

              }}>
                <TouchableOpacity style={{
                  width: 50,
                  height: 50,
                  right: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={require('../assets/icons/profile.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain'
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    right: 20,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={logout}
                >
                  <Image
                    source={require('../assets/icons/logout.png')}
                    resizeMode="contain"
                    style={{

                      width: 25,
                      height: 25,
                      tintColor: '#000066',
                    }}
                  />
                </TouchableOpacity>
                {modaVisible && (
                  <View style={{ margin: 0, padding: 0 }}>
                    <Mymodal visible={modaVisible} onClose={() => setModalVisible(false)} />
                  </View>
                )}
              </View>
            ),
          }}
        />
<Tabs.Screen
          name="friends"
          options={{
            title: 'friends',
            headerShown: true,
           
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
