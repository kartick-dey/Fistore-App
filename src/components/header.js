import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import Images from '../constants/images';

const { width } = Dimensions.get('screen');

const Header = (props) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.brandContainer}>
                <TouchableOpacity onPress={props.onOpenDrawer}>
                    <Icon name="menu" size={width * 0.08} color={colors.primary}></Icon>
                </TouchableOpacity>
                <Text style={styles.brandName}> F<Text style={{ color: colors.primary }}>!</Text>
                    <Text style={{ fontSize: width * 0.04, fontWeight: 'bold' }}>STORE</Text> </Text>
            </View>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={props.onOpenProfile} style={styles.profileIconContainer}>
                    <Image source={Images.avater} style={styles.profileIcon} />
                    {/* <Icon name="person-circle-outline" size={width * 0.08} color="grey" /> */}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 55,
        backgroundColor: colors.bgColor,
        // justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        // borderBottomColor: '#dddddd',
        // borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 9,
        flexDirection: 'row',
        // zIndex: 1,
        elevation: 5
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
        alignItems: 'flex-end',
        alignSelf: 'center'
    },
    profileIconContainer: { 
        width: 33, 
        height: 33, 
        borderRadius: 33 / 2, 
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    profileIcon: { 
        flex: 1, 
        width: null, 
        height: null, 
        resizeMode: 'cover'
    }
});

export default Header; 