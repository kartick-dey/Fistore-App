import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Login';
import MainNavigator from './navigators/Navigators';

const Stack = createStackNavigator()

class AppNavigation extends Component {
    screenOption = () => {
        return {
            headerShown: false
        }
    };
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash" screenOptions={this.screenOption}>
                    <Stack.Screen name="Splash" component={SplashScreen}></Stack.Screen>
                    <Stack.Screen name="Auth" component={LoginScreen}></Stack.Screen>
                    <Stack.Screen name="Main" component={MainNavigator}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
