import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Alert, TextInput, Text, TouchableOpacity } from 'react-native';
import BrandLogo from '../components/brandLogo';
import colors from '../constants/colors';

const VerifyToken = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [otp, setOTP] = useState(null);
    useEffect(() => {
        const {phone, onConfirmation} = props.route.params;
        console.log('PhoneNumber: ', phone);
        console.log('confirmation: ', onConfirmation);
        setConfirmation(onConfirmation);
        setPhoneNumber(phone);
    }, [props]);

    const verifyCode = async () => {
        if (otp) {
            try {
                const result = await confirmation.confirm(otp);
                console.log("Result: ", result);
                props.navigation.navigate('Main');
            } catch (error) {
                console.log("Error: ", error);
                alert(error);
            }
        } else {
            alert('Please enter verification code.');
        }
    };

    return (
        <View style={styles.verifyCodeContainer}>
            <View style={styles.brandContainer}>
                <BrandLogo></BrandLogo>
            </View>
            {isLoading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="red" style={{ opacity: 1, marginTop: 20, alignSelf: 'center' }}></ActivityIndicator>
            </View>) :
                (<View style={[styles.loginButtonContainer]}>
                    <View>
                        <Text style={{ fontSize: 25, color: colors.textColor}}>Enter OTP below</Text>
                    </View>
                    <View style={{ paddingVertical: 20, width: '60%' }}>
                        <View style={styles.inputContainer}>
                            <View style={{ flex: 1 }}>
                                <TextInput onChangeText={(otp) => setOTP(otp)}
                                    placeholder="Enter OTP" keyboardType='number-pad' style={styles.input} />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={verifyCode}
                        style={{ alignSelf: 'center', backgroundColor: colors.liner, paddingHorizontal: 40, paddingVertical: 10 }}>
                        <Text style={{ color: '#fff', alignSelf: 'center' }}>Submit OTP</Text>
                    </TouchableOpacity>
                </View>)}
        </View>
    );
}

const { height } = Dimensions.get("screen");
const width = height * 0.25;

const styles = StyleSheet.create({
    verifyCodeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    brandContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: colors.liner
    },
    input: {
        width: '100%',
        paddingVertical: 7,
        paddingHorizontal: 15,
        letterSpacing: 1,
        fontSize: 20
    },
    loginButtonContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: '#ccc',
        width: '100%'
    }
});

export default VerifyToken;
