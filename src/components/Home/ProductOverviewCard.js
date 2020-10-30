import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import StarRating from 'react-native-star-rating';
import colors from '../../constants/colors';
import Images from '../../constants/images';

const { width } = Dimensions.get('window');

const ProductOverviewCard = (props) => {
    const [saved, setSaved] = useState(false);
    let postedAt;
    if ((new Date().getDay() - new Date(props.product.createdAt).getDay()) === 0) {
        postedAt = 'Today'
    } else {
        postedAt = +(new Date().getDay() - new Date(props.product.createdAt).getDay()) + ' day ago';
    }
    return (
        <View style={styles.container}>
            <View style={styles.brandContainer}>
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <FontAwesome name="university" size={20} color={colors.primary} />
                    </View>
                </View>
                <View style={styles.fisheryNameContainer}>
                    <Text style={styles.fisheryNameText}>{props.product.fisheryName}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 5 }}>
                        <FontAwesome name="globe" size={12} color="grey" />
                        <Text style={styles.fisheryLocationText}>{props.product.location}</Text>
                    </View>
                </View>
                <View style={styles.saveBtnContainer}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setSaved(!saved)}>
                        <FontAwesome name={saved ? 'bookmark' : 'bookmark-o'} size={25} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.productContainer}>
                <TouchableOpacity style={styles.imgContainer} onPress={props.onClick}>
                    {/* <View style={styles.imgContainer}> */}
                    <Image source={{ uri: props.product.image }} style={styles.image} />
                    {/* </View> */}
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <TouchableOpacity onPress={props.onClick}>
                        <Text style={styles.fishNameText}>{props.product.fishName}</Text>
                        <Text style={styles.postedText}>Posted: {postedAt}</Text>
                        <FontAwesome name="inr" size={17} color={colors.primary} style={{ paddingVertical: 2 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}> {props.product.price}/{props.product.unit}</Text>
                        </FontAwesome>
                        <View style={{ paddingVertical: 4 }}>
                            <StarRating
                                containerStyle={{ width: width / 5 }}
                                emptyStarColor={colors.primary}
                                fullStarColor={colors.primary}
                                disabled={false}
                                maxStars={5}
                                starSize={13}
                                rating={4} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.contactContainer}>
                        <TouchableOpacity style={styles.contactBtn}>
                            <Icon name="phone-call" size={12} color='#fff' style={{ alignSelf: 'center', paddingHorizontal: 5 }}></Icon>
                            <Text style={styles.btnText}>Contact Seller</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        alignSelf: 'center',
        width: width - 15,
        height: width * 0.46,
        backgroundColor: '#fff',
        elevation: 0.5,
    },
    brandContainer: {
        padding: 5,
        height: '26%',
        width: '100%',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
    },
    productContainer: {
        height: '74%',
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: '#dddddd',
        // borderBottomWidth: 0.5,
        padding: 5
    },
    iconContainer: {
        paddingTop: 2,
        width: '13%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        paddingTop: 5,
        width: '85%',
        borderRadius: 50,
        height: '85%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    fisheryNameContainer: {
        width: '77%',
        height: '100%',
    },
    fisheryNameText: {
        paddingHorizontal: 5,
        paddingTop: 2,
        fontSize: 16,
        fontWeight: 'bold'
    },
    fisheryLocationText: {
        fontSize: 12,
        paddingHorizontal: 5,
        color: 'grey'
    },
    saveBtnContainer: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        padding: 5,
        height: '100%',
        width: '45%'
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderRadius: 5
    },
    detailsContainer: {
        padding: 5,
        height: '100%',
        width: '55%',
    },
    fishNameText: {
        // paddingVertical: 2,
        fontSize: 16,
        fontWeight: 'bold'
    },
    postedText: {
        paddingVertical: 2,
        color: 'grey',
        fontSize: 12
    },
    contactContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12
    },
    contactBtn: {
        alignSelf: 'flex-start',
        backgroundColor: colors.liner,
        paddingVertical: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderRadius: 5
    },
    btnText: {
        textAlign: 'center',
        paddingBottom: 2,
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default ProductOverviewCard;