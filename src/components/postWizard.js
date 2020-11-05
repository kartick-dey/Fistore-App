import React, { PureComponent, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import colors from '../constants/colors';

export const Step = (props) => {
    return (
        <View style={styles.stepContainer}>
            <View style={styles.childrenContainer}>
                {props.children({
                    values: props.values,
                    onChangeValue: props.onChangeValue,
                    onChangeDate: props.onChangeDate,
                    showdate: props.showdate,
                    handleSelectPhoto: props.handleSelectPhoto
                })}
            </View>
            <View style={styles.buttonContainer}>
                {props.currentIndex === 0 || <TouchableOpacity onPress={props.prevStep}
                    style={styles.prevBtn}>
                    <Text style={styles.prevBtnTitle}>Previous</Text>
                </TouchableOpacity>}
                {props.isLast ? (<TouchableOpacity onPress={props.onSubmit}
                    style={styles.submitBtn}  disabled={props.isLoading}>
                    { props.isLoading ? <ActivityIndicator size="small" color="#000" /> : 
                    <Text style={styles.submitBtnTitle}>Submit</Text>}
                </TouchableOpacity>) : (<TouchableOpacity onPress={props.nextStep}
                    style={styles.submitBtn}>
                    <Text style={styles.submitBtnTitle}>Next</Text>
                </TouchableOpacity>)}

            </View>
        </View>
    );
};

class PostWizard extends PureComponent {
    static Step = (props) => <Step {...props} />;
    dummyDesc = `The world famous fish farming center.`;
    state = {
        index: 0,
        values: {
            ...this.props.initialValues
        },
        isLoading: false
    };
    onNextStep = () => {
        if (this.state.index !== this.props.children.length - 1) {
            this.setState(prevState => ({ index: prevState.index + 1 }));
        }
    };
    onPrevStep = () => {
        if (this.state.index !== 0) {
            this.setState(prevState => ({ index: prevState.index - 1 }));
        }
    };
    onChangeValue = (name, value) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value
            }
        }));
    };
    onChangeDate = (event, selectedDate) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                showDatePicker: false
            }
        }));
        const currentDate = selectedDate || this.state.values.availableTill;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                availableTill: currentDate
            }
        }));
    };
    showdate = () => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                showDatePicker: true
            }
        }));
    };
    // Image Handling function
    handleSelectPhoto = () => {
        const options = {
            quality: 0.5
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            const img = {
                uri: response.uri,
                type: response.type,
                fileName: response.fileName,
                fileSize: response.fileSize,
                path: response.path
            };
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    image: img
                }
            }));
            console.log("Image from input: ", this.state.image);


        });
    };
    // Submit function
    onSubmit = async () => {
        this.setState(prevState => ({
            ...prevState,
            isLoading: true
        }));
        // console.log("Fish Details: ", this.state.values);
        // alert(this.state.values);
        const productData = {
            userId: this.state.values.userId,
            username: this.state.values.username,
            fisheryName: this.state.values.fisheryName,
            fishName: this.state.values.fishName,
            fishCategory: this.state.values.fishCategory.toUpperCase(),
            price: +this.state.values.price,
            unit: this.state.values.unit.toUpperCase(),
            // availableTill: new Date(availableTill).toISOString(),
            location: this.state.values.locality + ', ' + this.state.values.district + ', ' + this.state.values.state,
            contact: +this.state.values.contact,
            description: this.state.values.description || this.dummyDesc,
            image: this.state.values.image,
        }
        await this.props.onSubmit(productData);
        this.setState(prevState => ({
            ...prevState,
            isLoading: false
        }));
    };
    render() {
        // console.log("values: ", this.state);
        return (
            <View style={{ flex: 1 }}>
                {React.Children.map(this.props.children, (el, index) => {
                    if (index === this.state.index) {
                        return React.cloneElement(el, {
                            currentIndex: this.state.index,
                            nextStep: this.onNextStep,
                            prevStep: this.onPrevStep,
                            isLast: this.state.index === this.props.children.length - 1,
                            values: this.state.values,
                            onChangeValue: this.onChangeValue,
                            onChangeDate: this.onChangeDate,
                            showdate: this.showdate,
                            handleSelectPhoto: this.handleSelectPhoto,
                            onSubmit: this.onSubmit,
                            isLoading: this.state.isLoading
                        });
                    }

                    return null
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stepContainer: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    childrenContainer: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'baseline',
        paddingHorizontal: 5
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
    submitBtn: {
        alignSelf: 'center',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.bgColor
    },
    submitBtnTitle: {
        color: '#000',
        fontSize: 18,
        letterSpacing: 1
    }
});

export default PostWizard;