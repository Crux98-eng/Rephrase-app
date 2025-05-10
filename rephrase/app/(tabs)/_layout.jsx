import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

const AuthLayout = () => {
  return (
  <Tabs>
    <Tabs.Screen name='(tabs)' options={{headerShown:false}}/>
  </Tabs>
  )
} 

export default AuthLayout

const styles = StyleSheet.create({})