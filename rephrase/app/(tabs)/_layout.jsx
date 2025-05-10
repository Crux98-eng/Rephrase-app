import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Tabs,useNavigation  } from 'expo-router';
import { useRoute } from '@react-navigation/native';

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

const TabsLayout = () => {
 
  return (
    <Tabs>
      {/* chat*/}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <TabsIcon icon={require('../assets/icons/home.png')} color={color} focused={focused} />
          ),
        }}
      />

 {/* create button */}
{/* <Tabs.Screen
        name ="[userid]"
        options={{
          title:'chat',
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (

            <TabsIcon icon={require('../assets/icons/logo_secondary.png')} color={color} focused={focused} />
          ),
        }}
      />   */}
    </Tabs>
  );
};

export default TabsLayout;