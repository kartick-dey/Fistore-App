import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, Dimensions, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';


import colors from '../constants/colors';
import images from '../constants/images';

const width = Dimensions.get('window').width;


const Profile = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row', width: '30%' }}>
          <Icon name='arrow-back-outline' size={30} color="#000" style={{ padding: 10 }} />
          <Text style={styles.backBtnText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('MyProduct')} style={{ flexDirection: 'row' }}>
          <Text style={styles.myProductBtnText}>Your Products</Text>
          <FontAwesome name="shopping-bag" style={styles.myProductBtnIcon} size={20} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.profile_bg_1} style={styles.bgImage}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView scrollEventThrottle={16} style={{ flex: 1 }}>
              <View style={styles.profileContainer}>
                <View style={styles.editBtn}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => {props.navigation.navigate('EditProfile')}}>
                    <FontAwesome name="pencil" size={24} color={colors.liner} />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileImgContainer}>
                  <Image source={images.avater} style={styles.profileImg}></Image>
                </View>
                <View style={styles.profileNameContainer}>
                  <Text style={styles.profileName}>Kartick Dey KD</Text>
                </View>
              </View>
              <View style={styles.informationContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Contact Information</Text>
                  <TouchableOpacity style={styles.editBtnOther}
                    onPress={() => {props.navigation.navigate('EditProfile')}}>
                    <FontAwesome name="pencil" size={24} color={colors.liner} />
                  </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.details}>
                    <Feather name="phone-call" size={15} style={styles.detailsIcon} />
                    <Text style={styles.detailsText}>+91-8170990726</Text>
                  </View>
                  <View style={styles.details}>
                    <Feather name="mail" size={16} style={styles.detailsIcon} />
                    <Text style={styles.detailsText}>kartick.dey1995@gmail.com</Text>
                  </View>
                </View>
              </View>
              <View style={styles.informationContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Fishery Center</Text>
                  <TouchableOpacity style={styles.editBtnOther}
                    onPress={() => {props.navigation.navigate('EditProfile')}}>
                    <FontAwesome name="pencil" size={24} color={colors.liner} />
                  </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.details}>
                    <FontAwesome name="industry" size={14} style={styles.detailsIcon} />
                    <Text style={styles.detailsText}>Maa Kali Fishery Center</Text>
                  </View>
                  <View style={styles.details}>
                    <FontAwesome name="check-square-o" size={16} style={styles.detailsIcon} />
                    <Text style={[styles.detailsText, { fontWeight: 'normal' }]}>Rohi, Katla, Koi, Grase Curb and Pona</Text>
                  </View>
                  <View style={styles.details}>
                    <Icon name="location-sharp" size={16} style={styles.detailsIcon} />
                    <Text style={[styles.detailsText, { fontWeight: 'normal' }]}>Ramsagar, Bankura, West Bengal</Text>
                  </View>
                </View>
              </View>
              <View style={styles.informationContainer}>
                <View style={[styles.titleContainer, { justifyContent: 'flex-start' }]}>
                  <Text style={[styles.title, { alignSelf: 'center' }]}>Location in Maps</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={{ height: 150, width: '100%' }}>
                    <Image source={images.demo_location} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}></Image>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  header: {
    height: 50,
    width: width,
    backgroundColor:
      colors.bgColor,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backBtnText: {
    padding: 14,
    paddingLeft: 5,
    fontSize: 22,
    fontWeight: 'bold'
  },
  myProductBtnText: {
    padding: 10,
    fontSize: 14,
    alignSelf: 'center',
    paddingRight: 0,
    fontWeight: '700'
  },
  myProductBtnIcon: {
    alignSelf: 'center',
    padding: 10,
    paddingRight: 15
  },
  profileContainer: {
    width: width - 20,
    height: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: width / 4,
    elevation: 1,
    // borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
  },
  profileImgContainer: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 6,
    overflow: 'hidden',
    position: 'absolute',
    top: -width / 6,
    alignSelf: 'center',
    borderColor: '#ddd',
    borderWidth: 5
  },
  profileImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  editBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  profileNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    alignSelf: 'center'
  },
  profileName: {
    color: colors.textColor,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  informationContainer: {
    paddingTop: 0,
    width: width - 20,
    backgroundColor: '#fff',
    marginTop: 8,
    elevation: 1,
    // borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    // height: 100
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
  },
  editBtnOther: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: colors.secondaryTextColor
  },
  detailsContainer: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  details: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'flex-start'
  },
  detailsIcon: {
    alignSelf: 'center',
    color: colors.liner
  },
  detailsText: {
    paddingLeft: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.primaryTextColor
  }
});


export default Profile;