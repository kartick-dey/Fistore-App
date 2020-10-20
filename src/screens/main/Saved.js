import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/header';


export default class Cart extends Component {
  constructor(props) {
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
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> Saved Screen </Text>
      </View>
    );
  }
}
