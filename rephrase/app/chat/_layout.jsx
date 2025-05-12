import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';

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
    <Tabs>
         <Tabs.Screen
               name="chat"
               options={{
                 title: 'chatting',
                 headerShown: true,
                 tabBarIcon: ({ focused, color }) => (
                   <TabsIcon icon={require('../assets/icons/home.png')} color={color} focused={focused} />
                 ),
               }}
             />
       

    </Tabs>
  )
}

export default ChatLayout