import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
const _layout = () => {
  return (
    <GestureHandlerRootView>
    <Stack>
        <Stack.Screen  name='index' options={{title:'index',headerShown:false}}/>
    </Stack>
    </GestureHandlerRootView>
  )
}

export default _layout

const styles = StyleSheet.create({})