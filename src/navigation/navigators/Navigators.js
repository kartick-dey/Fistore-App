import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeScreen from '../../screens/main/Home';
import ProductOverview, {ProductOverviewScreenOption} from '../../screens/main/ProductOverview';
import ProductDetailsScreen from '../../screens/main/ProductDetails';
import AddPostScreen from '../../screens/main/AddPost';
import SavedScreen from '../../screens/main/Saved';
import MessageScreen from '../../screens/main/Message';
import NotificationScreen from '../../screens/main/Notification';
import ProfileScreen from '../../screens/Profile';
import DrawerContent from '../../screens/DrawerContent';
import colors from '../../constants/colors';
import MyProduct from '../../screens/MyProducts';
import EditProfile from '../../screens/EditProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackScreens = (props) => {
    return (
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Main" component={MainTabScreens} options={{ headerShown: false}}/>
            <Stack.Screen name="ProductOverview" component={ProductOverview}  options={ProductOverviewScreenOption} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{
                headerTitle: false,
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerTintColor: '#fff'
            }}/>
            <Stack.Screen name="Profile" component={ProfileScreen}  options={{ headerShown: false}}></Stack.Screen>
            <Stack.Screen name="MyProduct" component={MyProduct}  options={{ headerShown: false}}></Stack.Screen>
            <Stack.Screen name="EditProfile" component={EditProfile}  options={{ headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    );
};


const MainTabScreens = (props) => {
    return (
        <Tab.Navigator initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: colors.primary,
                inactiveTintColor: "#838485",
                labelStyle: {
                    fontSize: 12,
                    margin: 0,
                    padding: 0,
                },
                tabStyle: {
                    paddingVertical: 5,
                    // backgroundColor: colors.liner
                },
                safeAreaInsets: {
                    // bottom: 5,
                },
            }}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcon name="home-outline" color={color} size={32} />
                    ),
                }} />

            <Tab.Screen name="Message" component={MessageScreen}
                options={{
                    tabBarLabel: 'Message',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="chatbox-outline" size={26} color={color} />
                    ),
                }} />
            <Tab.Screen name="Add Post" component={AddPostScreen}
                options={{
                    tabBarLabel: 'Add Post',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <FeatherIcon name="plus-square" color={color} size={27} />
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


const SideBarScreens = (props) => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
        >
            <Stack.Screen name="Profile" component={ProfileScreen} options={{
                headerTitle: false,
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerTintColor: '#fff'
            }}/>
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

const MainNavigator = (props) => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
            <Drawer.Screen name="Main" component={MainStackScreens}></Drawer.Screen>
        </Drawer.Navigator>
    );
}



export default MainNavigator;