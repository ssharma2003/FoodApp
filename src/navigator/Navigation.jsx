import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import Details from '../screens/DetailsScreen'

const Stack = createStackNavigator()
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown:false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})