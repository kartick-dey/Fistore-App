import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Home extends Component {
    constructor(props) {
        // console.log('Home: ', props);
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> Home Screen </Text>
            </View>
        );
    }
}
