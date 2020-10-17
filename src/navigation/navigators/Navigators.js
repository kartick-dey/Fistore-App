import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../../screens/Splash';
import LoginScreen from '../../screens/Login';
import HomeScreen from '../../screens/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = (props) => {
    // console.log('AuthNavigator: ', props);
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
};

const MainNavigator = (props) => {
    console.log('MainNavigator: ', props);
    return (
        <Tab.Navigator
            initialRouteName="Home"
        >
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
    );
};


export { AuthNavigator, MainNavigator };