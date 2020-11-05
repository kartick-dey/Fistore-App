import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

const { height, width } = Dimensions.get('window');

const FishCard = (props) => {
    // const imageUrl = `${IMG_ENDPOINT}` + props.image;
    const unit = props.unit.toLowerCase();
    const location = props.location;
    const listLocation = location.split(',');
    // console.log("PostedAt: ", typeof(new Date().getDay() - new Date(props.postedAt).getDay()));
    let postedAt;
    if ((new Date().getDay() - new Date(props.postedAt).getDay()) === 0) {
        postedAt = 'Today'
    } else {
        postedAt = +(new Date().getDay() - new Date(props.postedAt).getDay()) + ' day ago';
    }
    // const postedAt = new Date(props.postedAt);
    return (
        <View style={styles.fisCard}>
            <View style={{ flex: 3 }}>
                <Image style={styles.image} source={{ uri: props.image }}></Image>
                {props.saveBtn ? <View style={styles.saveButton}>
                    <View style={{ backgroundColor: 'white', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name="bookmark-o" size={20} color={colors.primary} />
                        {/* <FontAwesome name="bookmark" size={20} color={colors.primary} /> */}
                        <Text style={{ fontSize: 10, color: colors.primary, fontWeight: '700' }}>Save</Text>
                    </View>
                </View> : null}
            </View>
            <View style={styles.textContainer}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={styles.typeText}>{props.fishType}</Text>
                        <Text style={styles.nameText}>{props.fishName}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-evenly', paddingRight: 5 }}>
                        <Icon name="location-outline" size={10} style={{ paddingVertical: 4 }}>
                            <Text style={{ fontSize: 10, marginLeft: 5 }}>{listLocation[2]}</Text>
                        </Icon>
                        <FontAwesome name="inr" size={13} color={colors.primary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}> {props.price}/{unit}</Text>
                        </FontAwesome>
                    </View>
                </View>
                <View>
                    <Text style={styles.postedDate}>Posted: {postedAt}</Text>
                </View>

                <StarRating
                    containerStyle={{ width: width / 4 }}
                    emptyStarColor={colors.primary}
                    fullStarColor={colors.primary}
                    disabled={false}
                    maxStars={5}
                    starSize={15}
                    rating={props.rating} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fisCard: {
        marginTop: 10,
        width: width / 2 - 15,
        height: width / 2,
        marginHorizontal: 6,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 5
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderRadius: 5,
        opacity: 0.9,
    },
    saveButton: {
        width: width / 2 - 15,
        paddingHorizontal: 10,
        position: 'absolute',
        alignItems: 'flex-end',
        display: "flex"
    },
    textContainer: {
        flex: 2, 
        justifyContent: 'center', 
        paddingLeft: 10
    },
    typeText: {
        fontSize: 14, 
        color: 'grey',
        textTransform: 'capitalize'
    },
    nameText: {
        fontSize: 18, 
        color: colors.primary,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    postedDate: {
        paddingTop: 0,
        margin: 0,
        color: 'grey'
    }

});

export default FishCard;