import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';


import colors from '../constants/colors';
import images from '../constants/images';

const width = Dimensions.get('window').width;

const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const HEADER_MAX_HEIGHT = 150;
const PROFILE_PIC_MAXHEIGHT = width / 3.2;
const PROFILE_PIC_MINHEIGHT = width / 5;


const Profile = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 100, width: width, backgroundColor: '#ddd' }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name='arrow-back-outline' size={30} color="#000" style={{ padding: 10 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImgContainer: {
    height: PROFILE_PIC_MAXHEIGHT,
    width: PROFILE_PIC_MAXHEIGHT,
    borderRadius: PROFILE_PIC_MAXHEIGHT / 2,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
    marginLeft: 20,
    // alignSelf: 'center'
  },
  profileImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain'
  }
});


export default Profile;