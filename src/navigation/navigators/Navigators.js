import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeScreen from '../../screens/main/Home';
import ProductScreen from '../../screens/main/Products';
import ProductDetailsScreen from '../../screens/main/ProductDetails';
import CategoryScreen from '../../screens/main/Category';
import SavedScreen from '../../screens/main/Saved';
import SearchScreen from '../../screens/main/Search';
import NotificationScreen from '../../screens/main/Notification';
import ProfileScreen from '../../screens/Profile';
import DrawerContent from '../../screens/DrawerContent';
import colors from '../../constants/colors';

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
                headerShown: false,
            }}
            tabBarOptions={{
                activeTintColor: colors.primary,
                // inactiveTintColor: "#fff",
                inactiveTintColor: "#838485",
                // style: {
                //     height: '6.5%',
                //     backgroundColor: colors.hover,
                //     position:'absolute',
                //     bottom:0,
                //     elevation:0
                //     },
                labelStyle: {
                    fontSize: 12,
                    margin: 0,
                    padding: 0,
                },
                tabStyle: {
                    paddingVertical: 5
                },
                safeAreaInsets: {
                    bottom: 5
                }
            }}>
            <Tab.Screen name="Home" component={HomeStackScreens}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcon name="home-outline" color={color} size={32} />
                    ),
                }} />
            <Tab.Screen name="Category" component={CategoryScreen}
                options={{
                    tabBarLabel: 'Category',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="grid-outline" color={color} size={24} />
                    ),
                }} />
            <Tab.Screen name="Search" component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="search-circle-outline" color={color} size={33} />
                    ),
                }} />
            <Tab.Screen name="Notification" component={NotificationScreen}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="notifications-outline" color={color} size={27} />
                    ),
                }} />
            <Tab.Screen name="Saved" component={SavedScreen}
                options={{
                    tabBarLabel: 'Saved',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="bookmarks-outline" color={color} size={22} />
                    ),
                }} />
        </Tab.Navigator>
    );
};

// const screenOptions = (label, icon, size, color) => {
//     return {
//         tabBarLabel: 'Home',
//         tabBarColor: '#fff',
//         tabBarIcon: ({ color }) => (
//             <Icon name="home" color={color} size={27} />
//         ),
//     }
// }

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



export default MainNavigator;