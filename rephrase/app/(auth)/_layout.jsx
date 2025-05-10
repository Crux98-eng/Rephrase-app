import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const AuthLayout = () => {
  return (
 <GestureHandlerRootView style={{flex:1}}> 
    <Stack screenOptions={{headerShown:false}}>

       <Stack.Screen name='signin' options={{title: 'signIn',headerShown:false}}/>
      <Stack.Screen name='signup'options={{title: 'Sign Up',headerShown:false}}/>

    </Stack>
   </GestureHandlerRootView>
  )
}

export default AuthLayout