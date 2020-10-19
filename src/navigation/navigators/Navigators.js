import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'


import HomeScreen from '../../screens/main/Home';
import ProductScreen from '../../screens/main/Products';
import ProductDetailsScreen from '../../screens/main/ProductDetails';
import CategoryScreen from '../../screens/main/Category';
import CartScreen from '../../screens/main/Cart';
import SearchScreen from '../../screens/main/Search';
import NotificationScreen from '../../screens/main/Notification';
import ProfileScreen from '../../screens/Profile';
import DrawerContent from '../../screens/DrawerContent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreens = (props) => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Products" component={ProductScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        </Stack.Navigator>
    );
};

const MainTabScreens = (props) => {
    return (
        <Tab.Navigator initialRouteName="Home"
        screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="Home" component={HomeStackScreens} />
            <Tab.Screen name="Categoty" component={CategoryScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Notification" component={NotificationScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
    );
};

const SideBarScreens = (props) => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

const MainNavigator = (props) => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
            <Drawer.Screen name="MainTab" component={MainTabScreens}></Drawer.Screen>
        </Drawer.Navigator>
    );
}



export default MainNavigator ;