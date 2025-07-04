import { View, Text ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import logo_primary from '../assets/icons/logo_primary.png'
import { custom_colors } from '../utilities/colors';
const TabsIcon = ({ icon, color, focused }) => (
   
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Image
          source={icon}
          resizeMode="contentFit"
          style={{
            width: 20,
            height: 20,
            tintColor:custom_colors.primary_dark ,
          }}
        />
      </View>
    );
const ChatLayout = () => {
   
    
    
  return (
    <GestureHandlerRootView>
   <Tabs screenOptions={{ 
    headerShown: false,
    
    }}>
  <Tabs.Screen
    name="[userId]"
    options={{
      title: 'chat',
      headerShown:false,
           tabBarIcon: ({ focused, color }) => (
            <TabsIcon
              icon={logo_primary}
              color={color}
              focused={focused}
            />
           ),
           headerBackButtonDisplayMode:'default',
           headerBackVisible:true,
          
    }}
  />
</Tabs>
</GestureHandlerRootView>
  )
}

export default ChatLayout
