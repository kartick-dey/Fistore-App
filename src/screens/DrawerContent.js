import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    Avater,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Avatar
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux'

import * as authActions from '../store/actions/auth';

import Images from '../constants/images';
import colors from '../constants/colors';

const DrawerContent = (props) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await dispatch(authActions.logout((error, result) => {
            if (error) {
                console.log('Error in Drawer: ', error);
                return;
            }
            console.log(result);
            props.navigation.closeDrawer();
            props.navigation.navigate('Auth');
        }));
    };
    return (
        <View style={{ flex: 1, padding: 0, margin: 0, backgroundColor: '#fff' }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {props.navigation.navigate('Profile')}}>
                                <Avatar.Image source={Images.avater}
                                    size={50}></Avatar.Image>
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>Kartick Dey</Title>
                                    <Caption style={styles.caption}>+91-8170990726</Caption>
                                    {/* <Caption style={styles.caption}>kartick.dey@gmail.com</Caption> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>540</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="home-outline" color={color} size={size}></MaterialCommunityIcons>
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome name="shopping-bag" style={{ paddingLeft: 2, paddingRight: 3 }} color={color} size={18} />
                            )}
                            label="Your Products"
                            onPress={() => { props.navigation.navigate('MyProduct') }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="bookmarks-outline" style={{ paddingLeft: 3, paddingRight: 3 }} color={color} size={18} />
                            )}
                            label="Saved Products"
                            onPress={() => { props.navigation.navigate('Saved') }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="card-sharp" style={{ paddingLeft: 3, paddingRight: 3 }} color={color} size={19} />
                            )}
                            label="Add Shop"
                            onPress={() => { Alert.alert("Add Shop", "Add your shop later.") }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="cog-outline" style={{ paddingRight: 3 }} color={color} size={size}></MaterialCommunityIcons>
                            )}
                            label="Settings"
                            onPress={() => { }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="account-check-outline" style={{ paddingRight: 3 }} color={color} size={size}></MaterialCommunityIcons>
                            )}
                            label="Support"
                            onPress={() => { }}
                        >
                        </DrawerItem>
                    </Drawer.Section>
                    <Drawer.Section title='Preference'>
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ marginLeft: 17 }}>Dark Theme</Text>
                                </View>
                                <View pointerEvents='none' style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Switch value={isDarkTheme}></Switch>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="exit-to-app" color={color} size={size}></MaterialCommunityIcons>
                    )}
                    label="Sign Out"
                    onPress={logoutHandler}
                >
                </DrawerItem>
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        padding: 0,
        margin: 0,
        flex: 1,
    },
    userInfoSection: {
        width: '100%',
        marginTop: 0,
        margin: 0,
        paddingLeft: 20,
        backgroundColor: colors.bgColor,
        paddingBottom: 20,
        alignSelf: 'center'
    },
    avater: {
        marginTop: 20,
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
    }
});

export default DrawerContent;