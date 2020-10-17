import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator, MainNavigator, } from './navigators/Navigators';

class AppNavigation extends Component {
    render() {
        return (
            <NavigationContainer>
                { this.props.userToken !== false ? <MainNavigator></MainNavigator>
                    : <AuthNavigator></AuthNavigator>
                }
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
