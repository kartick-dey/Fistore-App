import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';

const { height, width } = Dimensions.get('window');

const MarketCard = (props) => {
    return (
        <View style={styles.cardContainer}>
            <View style={{ flex: 3 }}>
                <Image source={props.image} style={styles.image}>
                </Image>
                <View style={styles.conatiner}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{props.name}</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 2}}>
                        <Icon name="phone-call" size={12} style={{ color: 'white', paddingRight: 5}}></Icon>
                        <Text style={styles.text}>+91-{props.contactNo}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 190,
        width: width - 21,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: "#dddddd",
        alignItems: 'stretch',
        justifyContent: 'center',
        borderRadius: 10,
    },
    image: {
        flexGrow: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    conatiner: {
        width: width - 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    textContainer: {
        width: width - 17,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#fff',
        paddingVertical: 5
    },
    text: {
        color: 'white',
        fontSize: 12
    }
});

export default MarketCard;