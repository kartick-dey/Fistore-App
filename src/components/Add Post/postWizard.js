import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';

export const Step = (props) => {
    return (
        <View style={styles.stepContainer}>
            <View style={styles.childrenContainer}>
                {props.children({
                    onChangeValue: props.onChangeValue,
                    values: props.values
                })}
            </View>
            <View style={styles.buttonContainer}>
                {props.currentIndex === 0 || <TouchableOpacity onPress={props.prevStep}
                    style={styles.prevBtn}>
                    <Text style={styles.prevBtnTitle}>Previous</Text>
                </TouchableOpacity>}
                <TouchableOpacity onPress={props.nextStep}
                    style={styles.submitBtn}>
                    <Text style={styles.submitBtnTitle}>{props.isLast ? 'Create Post' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

class PostWizard extends PureComponent {
    static Step = (props) => <Step {...props} />;
    state = {
        index: 0,
        values: {
            ...this.props.initialValues
        }
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
    }
    render() {
        console.log("values: ", this.state);
        return (
            <View style={{ flex: 1 }}>
                {React.Children.map(this.props.children, (el, index) => {
                    if (index === this.state.index) {
                        return React.cloneElement(el, {
                            currentIndex: this.state.index,
                            nextStep: this.onNextStep,
                            prevStep: this.onPrevStep,
                            isLast: this.state.index === this.props.children.length - 1,
                            onChangeValue: this.onChangeValue,
                            values: this.state.values
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