import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

const { height, width } = Dimensions.get('window');

const FishCard = (props) => {
    return (
        <View style={styles.fisCard}>
            <View style={{ flex: 2 }}>
                <Image style={styles.image} source={props.image}></Image>
                <View style={styles.saveButton}>
                    <FontAwesome name="bookmark" size={20} color={colors.primary}></FontAwesome>
                </View>
            </View>
            <View style={styles.textContainer}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems:'center'}}>
                    <View style={{ flex: 1, justifyContent: 'flex-start'}}>
                        <Text style={styles.typeText}>{props.fishType}</Text>
                        <Text style={styles.nameText}>{props.fishName}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-evenly', paddingRight: 5}}>
                        <Icon name="compass-outline" size={10} style={{ paddingVertical: 4}}>
                            <Text style={{ fontSize: 10}}>Bankura</Text>
                        </Icon>
                        <FontAwesome name="inr" size={13} color={colors.primary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14}}> 20/kg</Text>
                        </FontAwesome>
                    </View>
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
        height: width / 2 - 15,
        marginHorizontal: 5,
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
        alignItems: 'flex-end'
    },
    textContainer: {
        flex: 1, justifyContent: 'space-evenly', paddingLeft: 10
    },
    typeText: {
        fontSize: 14, color: colors.primary
    },
    nameText: {
        fontSize: 16, fontWeight: 'bold'
    },

});

export default FishCard;