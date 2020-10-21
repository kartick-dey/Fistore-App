import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/header';
import CategoryCard from '../../components/Home/CategoryCard';
import FishCard from '../../components/Home/FishCard';
import MarketCard from '../../components/Home/MarketCard';
import images from '../../constants/images';
import * as productActions from '../../store/actions/product';

const { height, width } = Dimensions.get('window');

const Home = (props) => {

    const products = useSelector(state => state.products.products);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllProduct = async () => {
            dispatch(productActions.getAllProducts((error, result) => {
                if (error) {
                    console.log("Error from Home : ", error);
                    return;
                }
                console.log("Result from Home: ", result);
            }))
        };
        fetchAllProduct();
    }, [dispatch]);

    const openDrawer = () => {
        props.navigation.openDrawer();
    }
    // const renderFishCard = ({ item }) => (
    //     <FishCard 
    //     image={images.fish_1} 
    //     fishType="Fish" 
    //     fishName="Katla" 
    //     rating={3.5} />
    // );
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header onOpenDrawer={openDrawer}></Header>
            <ScrollView scrollEventThrottle={16}>
                <View style={styles.bodyContainer}>
                    <Text style={styles.heading}>Explore By Category?</Text>
                    <View style={styles.categoryContainer}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <CategoryCard name="Fish Spawn" image={images.fish_spawn} />
                            <CategoryCard name="Fish Seed" image={images.fish_seed} />
                            <CategoryCard name="Fish" image={images.fish} />
                            <CategoryCard name="Aqurium Fish" image={images.aqurium_fish} />
                        </ScrollView>
                    </View>
                    <Text style={styles.heading}>Introducing Fistore Marketplace</Text>
                    <Text style={styles.caption}>A collection of verified, best quality and low cost Fish Market and Aqurium Center</Text>
                    <View style={styles.marketContainer}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <MarketCard name="World Famous Fish Center" contactNo="8170990726" image={images.market_1} />
                            <MarketCard name="World Famous Aqurium Center" contactNo="8170990726" image={images.aqurium_1} />
                            <MarketCard name="World Famous Fish Center" contactNo="8170990726" image={images.market_2} />
                            <MarketCard name="World Famous Aqurium Center" contactNo="8170990726" image={images.aqurium_2} />
                            <MarketCard name="World Famous Fish Center" contactNo="8170990726" image={images.market_3} />
                            <MarketCard name="World Famous Aqurium Center" contactNo="8170990726" image={images.aqurium_3} />
                            <MarketCard name="World Famous Fish Center" contactNo="8170990726" image={images.market_4} />
                        </ScrollView>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.heading}>Fishes Around the World</Text>
                    <View style={styles.fishContainer}>
                        {/* <FlatList 
                        data={products}
                        horizontal={true}
                        keyExtractor={(item) => item.userId}
                        renderItem={renderFishCard} /> */}
                        <FishCard image={images.fish_1} fishType="Fish" fishName="Katla" rating={3.5}></FishCard>
                        <FishCard image={images.fish_2} fishType="Fish" fishName="Katla" rating={2.5}></FishCard>
                        <FishCard image={images.fish_3} fishType="Fish" fishName="Katla" rating={4.5}></FishCard>
                        <FishCard image={images.fish_4} fishType="Fish" fishName="Katla" rating={4}></FishCard>
                        <FishCard image={images.fish_5} fishType="Fish" fishName="Katla" rating={3}></FishCard>
                        <FishCard image={images.fish_6} fishType="Fish" fishName="Katla" rating={3.5}></FishCard>
                        <FishCard image={images.fish_7} fishType="Fish" fishName="Katla" rating={5}></FishCard>
                        <FishCard image={images.fish_8} fishType="Fish" fishName="Katla" rating={3}></FishCard>
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        paddingHorizontal: 13,
        // letterSpacing: 1
    },
    caption: {
        fontSize: 15,
        marginTop: 5,
        paddingHorizontal: 13
    },
    categoryContainer: {
        height: 130,
        marginTop: 10,
        marginBottom: 15,
        marginRight: 10,
    },
    marketContainer: {
        height: 200,
        marginTop: 10,
        marginBottom: 15,
        marginRight: 10
    },
    fishContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginBottom: 10
    }

});


export default Home;