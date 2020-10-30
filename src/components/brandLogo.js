import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Images from '../constants/images';
import LottieView from 'lottie-react-native';

const BrandLogo = (props) => {
    return (
      <View>
        <View style={styles.brandContainer}>
        <LottieView source={require('../../assets/banner/lf30_editor_mc0ij2ag.json')} autoPlay loop />
        </View>
        <Text style={styles.brandName}> F<Text style={{ color: '#c21616'}}>!</Text><Text>STORE</Text> </Text>
        <Text style={{ fontWeight: 'bold', color: '#a0a0a0', textAlign: 'center' }}>Connect with everyone</Text>
      </View>
    );
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  brandContainer: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
    justifyContent:'center'
  },
  brandLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  brandName: {
    marginVertical: 5,
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default BrandLogo;
