import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const CategoryCard = (props) => {
    return (
        <View style={styles.cardContainer}>
            <View style={{ flex: 4 }}>
                <Image source={props.image} style={styles.image}></Image>
            </View>
            <View style={styles.textConatiner}>
                <Text style={styles.name}>{props.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 130, 
        width: 130, 
        marginLeft: 10, 
        marginLeft: 10, 
        borderWidth: 0.5, 
        borderColor: "#dddddd",
        borderRadius: 5
    },
    image: {
        flex: 1, 
        width: null, 
        height: null, 
        resizeMode: 'cover',
        borderRadius: 5
    },
    textConatiner: {
        flex: 1, 
        paddingLeft: 10, 
        paddingTop: 10
    },
    name: {
        fontWeight: '700'
    } 
});

export default CategoryCard;