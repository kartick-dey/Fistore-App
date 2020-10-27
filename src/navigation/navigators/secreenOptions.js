import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';
import { NavigationEvents } from 'react-navigation';

const { width } = Dimensions.get('screen');

const ScreenOptions = (props) => {
    return {
        headertitle: (
            <Text style={styles.brandName}> F<Text style={{ color: colors.primary }}>!</Text>
                <Text style={{ fontSize: width * 0.04, fontWeight: 'bold' }}>STORE</Text> </Text>
        ),
        headerLeft: (
            <View style={styles.headerContainer}>
                <View style={styles.brandContainer}>
                    <TouchableOpacity onPress={props.onOpenDrawer}>
                        <Icon name="menu" size={width * 0.08} color={colors.primary}></Icon>
                    </TouchableOpacity>
                    <Text style={styles.brandName}> F<Text style={{ color: colors.primary }}>!</Text>
                        <Text style={{ fontSize: width * 0.04, fontWeight: 'bold' }}>STORE</Text> </Text>
                </View>
                <View style={styles.profileContainer}>
                    <Icon name="person-circle-outline" size={width * 0.08} color="grey" />
                </View>
            </View>
        ),
        tabBarLabel: 'Home',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
            <MaterialIcon name="home-outline" color={color} size={32} />
        ),
    };
};

const styles = StyleSheet.create({
    headerContainer: {
        height: '100%',
        backgroundColor: '#fff',
        // justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 9,
        flexDirection: 'row',
        // zIndex: 1
    },
    brandContainer: {
        flexDirection: 'row',
        flex: 1
    },
    brandName: {
        paddingTop: width * 0.004,
        textAlign: 'center',
        letterSpacing: 2,
        fontSize: width * 0.07,
        fontWeight: 'bold'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

export default ScreenOptions; 