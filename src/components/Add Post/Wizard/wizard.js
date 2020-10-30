import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Step = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{props.children}</Text>
            <View style={{flexDirection :'row'}}>
            {props.currentIndex === 0 || <TouchableOpacity onPress={props.prevStep}
                style={{ alignSelf: 'center', marginTop: 30, paddingHorizontal: 30, paddingVertical: 5, backgroundColor: '#ddd' }}>
                <Text>Prev</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={props.nextStep}
                style={{ alignSelf: 'center', marginTop: 30, marginLeft: 10, paddingHorizontal: 30, paddingVertical: 5, backgroundColor: '#ddd' }}>
                <Text>{ props.isLast ? 'Submit' : 'Next'}</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

class Wizard extends PureComponent {
    static Step = (props) => <Step {...props} />;
    state = {
        index: 0
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
    render() {
        return (
            <View style={{ flex: 1 }}>
                {React.Children.map(this.props.children, (el, index) => {
                    if (index === this.state.index) {
                        return React.cloneElement(el, {
                            currentIndex: this.state.index,
                            nextStep: this.onNextStep,
                            prevStep: this.onPrevStep,
                            isLast: this.state.index === this.props.children.length - 1
                        });
                    }

                    return null
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({});

export default Wizard;