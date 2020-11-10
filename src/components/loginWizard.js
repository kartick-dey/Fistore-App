import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import colors from '../constants/colors';

const Step = (props) => (
    <View style={styles.stepContainer}>
        <View style={styles.childrenContainer}>
            {props.children({
                values: props.values,
                changeValue: props.changeValue
            })}
        </View>
        <View style={styles.buttonContainer}>
            {props.currentIndex === 0 && <TouchableOpacity onPress={props.signInWithPhone}
                style={styles.btn} disabled={props.isLoading}>
                <Text style={styles.btnTitle}>{props.isLoading ? <ActivityIndicator size="small" color={colors.primary} /> : 'Send OTP'}</Text>
            </TouchableOpacity>}
            {props.currentIndex === 1 && <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={props.verifyCode}
                    style={styles.btn} disabled={props.isLoading}>
                    <Text style={styles.btnTitle}>{props.isLoading ? <ActivityIndicator size="small" color={colors.primary} /> : 'Submit OTP'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.cancel}
                    style={[styles.btn, { marginVertical: 10 }]} disabled={props.isLoading}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </TouchableOpacity>
            </View>}
            {props.currentIndex === 2 && <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={props.onSubmit}
                    style={styles.btn} disabled={props.isLoading}>
                    <Text style={styles.btnTitle}>{props.isLoading ? <ActivityIndicator size="small" color={colors.primary} /> : 'Submit'}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={props.cancel}
                    style={[styles.btn, { marginVertical: 10 }]} disabled={props.isLoading}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </TouchableOpacity> */}
            </View>}

        </View>
    </View>
);


export default class LoginWizard extends PureComponent {
    static Step = (props) => <Step {...props} />;

    state = {
        index: 0,
        values: {
            ...this.props.initialValues
        },
        isLoading: false,
        confirmation: null,
        // userData: null
    };
    onNextStep = async () => {
        if (this.state.index !== this.props.children.length - 1) {
            await this.setState(prevState => ({ index: prevState.index + 1 }));
            this.props.socialLogin(this.state.index);
        }
    };
    onCancel = async () => {
        if (this.state.index !== 0) {
            await this.setState(prevState => ({ index: prevState.index - 1 }));
            this.props.socialLogin(this.state.index);
        }
    };

    onChangeValue = (name, value) => {
        // if (value.length <= 9 ) {
        //     Alert.alert('Error', 'Invalid Phone Number');
        //     return;
        // }
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value
            }
        }));
    };

    signInWithPhone = async () => {
        this.props.setIsLoading;
        this.setState({ isLoading: true });
        if (this.state.values.phoneNumber.length !== 10) {
            Alert.alert("Warning", "Invalid phone number");
            this.setState({ isLoading: false });
            this.props.setIsLoading;
            return;
        }
        try {
            const confirmation = await auth().signInWithPhoneNumber(`+91-${this.state.values.phoneNumber}`);
            console.log('Confirmation : ', confirmation);
            if (confirmation._auth._authResult) {
                this.setState(prevState => ({ confirmation: confirmation }));
                this.setState(prevState => ({ index: prevState.index + 1 }));
                this.props.socialLogin(this.state.index);
                this.setState({ isLoading: false });
                this.props.setIsLoading;
            } else {
                Alert.alert("Error", "Internal server error");
                this.setState({ isLoading: false });
                this.props.setIsLoading;
            }
        } catch (error) {
            this.setState({ isLoading: false });
            this.props.setIsLoading;
        }
    };

    verifyCode = async () => {
        this.setState({ isLoading: true });
        if (this.state.values.code) {
            try {
                const result = await this.state.confirmation.confirm(this.state.values.code);
                // console.log("Result: ", result);
                this.setState(prevState => ({
                    values: {
                        ...prevState.values,
                        phoneNumber: result.user.phoneNumber,
                        providerUid: result.user.uid
                    }
                }));
                this.setState(prevState => ({ index: prevState.index + 1 }));
                this.setState({ isLoading: false });
                this.props.socialLogin(this.state.index);
            } catch (error) {
                console.log("Error: ", error);
                Alert.alert("Error", error);
                this.setState({ isLoading: false });
            }
        } else {
            Alert.alert("Warning", 'Please enter verification code.');
            this.setState({ isLoading: false });
        }
    };

    onSubmit = () => {
        this.setState({ isLoading: true });
        console.log("this.state.values.name.length : ", this.state.values.name.length);
        if (this.state.values.name.length < 3) {
            Alert.alert("Invalid Name:", "Please enter valid name");
            return;
        }
        const data = this.state.values;
        this.props.onSubmit(data);
        this.setState({ isLoading: false });
        this.props.socialLogin(0);
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {React.Children.map(this.props.children, (el, index) => {
                    if (index === this.state.index) {
                        return React.cloneElement(el, {
                            currentIndex: this.state.index,
                            nextStep: this.onNextStep,
                            cancel: this.onCancel,
                            isLast: this.state.index === this.props.children.length - 1,
                            values: this.state.values,
                            changeValue: this.onChangeValue,
                            isLoading: this.state.isLoading,
                            signInWithPhone: this.signInWithPhone,
                            verifyCode: this.verifyCode,
                            onSubmit: this.onSubmit
                        });
                    }
                    return null
                })}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    stepContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        paddingVertical: 30
        // backgroundColor: '#ddd'
    },
    childrenContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 10
        // height: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
        // justifyContent: 'space-evenly',
        // alignItems: 'baseline',
        // paddingHorizontal: 5
    },
    prevBtn: {
        alignSelf: 'center',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.bgColor
    },
    prevBtnTitle: {
        color: '#000',
        fontSize: 18,
        letterSpacing: 1
    },
    btn: {
        alignSelf: 'center',
        width: '62%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.bgColor,
        elevation: 1
    },
    btnTitle: {
        color: '#000',
        fontSize: 18,
        letterSpacing: 1
    }
});
