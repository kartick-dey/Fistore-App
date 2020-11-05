import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import MyProductCard from '../components/MyProductCard';
import colors from '../constants/colors'

const { width } = Dimensions.get('window')

const MyProduct = (props) => {
    const allProducts = useSelector(state => state.products.products);
    const userId = useSelector(state => state.auth.userId);
    const myProducts = allProducts.filter(product => product.userId === userId);
    console.log('myProducts: ', myProducts);
    const myProductCards = myProducts.map(product => <MyProductCard key={product.createdAt} product={product} />);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#ddd' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row', width: '30%' }}>
                        <Icon name='arrow-back-outline' size={30} color="#000" style={{ padding: 10 }} />
                        <Text style={styles.backBtnText}>My Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Saved')} style={{ flexDirection: 'row' }}>
                        <Text style={styles.savedProductBtnText}>Saved Products</Text>
                        <Icon name="bookmarks-outline" style={styles.savedProductBtnIcon} size={20} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView scrollEventThrottle={16} style={{ flex: 1 }}>
                        {myProductCards}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
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
    savedProductBtnText: {
        padding: 10,
        fontSize: 14,
        alignSelf: 'center',
        paddingRight: 0,
        fontWeight: '700'
    },
    savedProductBtnIcon: {
        alignSelf: 'center',
        padding: 10,
        paddingRight: 15
    },
});

export default MyProduct;
