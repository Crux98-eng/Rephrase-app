import { View, Text ,StyleSheet,Image} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const ChatLayout = () => {
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
  return (
    <GestureHandlerRootView>
   <Tabs screenOptions={{ 
    headerShown: false,
    
    }}>
  <Tabs.Screen
    name="chat"
    options={{
      title: 'chatting',
      tabBarIcon: ({ focused, color }) => (
        <TabsIcon
          icon={require('../assets/icons/menu.png')}
          color={color}
          focused={focused}
        />
      ),
    }}
  />
</Tabs>
</GestureHandlerRootView>
  )
}

export default ChatLayout