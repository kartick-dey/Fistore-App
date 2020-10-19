import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

const { width } = Dimensions.get('screen');

const Header = (props) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={props.onOpenDrawer}>
            <Icon name="menu" size={width * 0.08} color={colors.primary}></Icon>
            </TouchableOpacity>
            <Text style={styles.brandName}> F<Text style={{ color: colors.primary}}>!</Text><Text style={{ fontSize: width * 0.04}}>STORE</Text> </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: '6.5%',
        backgroundColor: '#f2f2f2',
        // justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 9,
        flexDirection: 'row'
    },
    brandName: {
        paddingTop: width * 0.004,
        textAlign: 'center',
        letterSpacing: 2,
        fontSize: width * 0.07,
        fontWeight: 'bold'
      }
});

export default Header; 