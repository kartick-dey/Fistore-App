import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import Header from '../../components/header';
import colors from '../../constants/colors';

export default class Search extends Component {
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
      <View style={{ flex: 1}}>
        <Header onOpenDrawer={this.openDrawer}></Header>
        {/* <KeyboardAvoidingView>
          <ScrollView style={{ display: 'flex'}}>  */}
            <View style={styles.searchBox}>
              <Icon style={styles.searchIcon} name="search-circle" size={30} color="grey"></Icon>
              <TextInput
                placeholder="Try West Bengal or Fish or Spawn or Seed" autoCapitalize="words" autoCorrect={true}
                placeholderTextColor="grey" style={styles.searchInput}></TextInput>
              <TouchableOpacity style={styles.searchButton}>
                <Text style={{ color: colors.primary, fontWeight: '700' }}>Search</Text>
              </TouchableOpacity>
            </View>
          {/* </ScrollView>
        </KeyboardAvoidingView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 50,
    borderColor: '#dddddd',
  },
  searchIcon: {
    paddingVertical: 5
  },
  searchInput: {
    paddingVertical: 0,
    flex: 1,
    backgroundColor: 'white'
  },
  searchButton: {
    paddingVertical: 10,
  },
});
