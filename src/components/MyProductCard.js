import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

const { width } = Dimensions.get('window')

const MyProductCard = (props) => (
    <View style={styles.myProductContainer}>
        <View style={styles.productContainer}>
            <ImageBackground source={{ uri: props.product.image }} blurRadius={1} style={styles.bgImage}>
                {/* <View style={styles.imgContainer}>
                <Image source={{ uri: props.product.image }} style={styles.image} />
            </View> */}
                <View style={{ flex: 3 }}></View>
                <View style={styles.detailsContainer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ color: colors.secondaryTextColor, fontSize: 14 }}>{props.product.fishCategory}</Text>
                            <Text style={styles.fishNameText}>{props.product.fishName}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={styles.postedText}>Posted: {new Date(props.product.createdAt).toDateString()}</Text>
                            <FontAwesome name="inr" size={17} color={colors.primaryTextColor} style={{ paddingVertical: 2 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}> {props.product.price}/{props.product.unit}</Text>
                            </FontAwesome>
                        </View>
                </View>
            </ImageBackground>
        </View>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn}>
                <Icon name="create-outline" size={16} color='green' style={{ alignSelf: 'center', paddingRight: 8 }}></Icon>
                <Text style={[styles.btnText, { color: 'green'}]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Icon name="trash-outline" size={16} color={colors.primary} style={{ alignSelf: 'center', paddingRight: 8 }}></Icon>
                <Text style={styles.btnText}>Remove</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    myProductContainer: {
        height: width / 1.8,
        width: width - 20,
        // padding: 5,
        elevation: 1,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 5
    },
    productContainer: {
        height: '75%',
        width: '100%',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 0.5,
        overflow: 'hidden',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    bgImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    detailsContainer: {
        width: '100%',
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    fishNameText: {
        // paddingVertical: 2,
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.primaryTextColor
    },
    postedText: {
        paddingVertical: 2,
        color: colors.secondaryTextColor,
        fontSize: 14
    },
    btnContainer: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // paddingBottom: 2
    },
    btn: {
        width: '45%',
        // alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#ddd',
        paddingVertical: 8,
        // paddingHorizontal: 30,
        flexDirection: 'row',
        borderRadius: 2,
        elevation: 1,
        borderRadius: 100,
    },
    btnText: {
        textAlign: 'center',
        // paddingBottom: 2,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default MyProductCard;
