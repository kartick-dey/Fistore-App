import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../../commons/header';

export default class Home extends Component {
    constructor(props) {
        // console.log('Home: ', props);
        super(props);
        this.state = {
        };
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header onOpenDrawer={this.openDrawer}></Header>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> Home Screen </Text>
            </View>
        );
    }
}
