import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const LoginButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.loginButton, { backgroundColor: props.bgColor }]}>
                { props.iconName ? <View style={{width: '30%', justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={props.iconName} style={styles.icon}></Icon>
                </View> : null}
                <View style={{width: '70%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.text}>{props.type === 'Phone' ? 'Send OTP' : `Continue with ${props.type}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const { height } = Dimensions.get("screen");
const width = height * 0.3;

const styles = StyleSheet.create({
    loginButton: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: width,
        height: width * 0.15,
        borderRadius: 5,
    },
    icon: {
        justifyContent: 'flex-start',
        paddingRight: 30,
        fontSize: 25,
        color: '#fff'
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 1,
        alignSelf: 'center'
    }
});


export default LoginButton;