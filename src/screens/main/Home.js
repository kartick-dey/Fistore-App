import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/header';
import CategoryCard from '../../components/Home/CategoryCard';
import FishCard from '../../components/Home/FishCard';
import MarketCard from '../../components/Home/MarketCard';
import images from '../../constants/images';
import * as productActions from '../../store/actions/product';
import colors from '../../constants/colors';

const Home = (props) => {

    const products = useSelector(state => state.products.products);
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const fetchAllProduct = async () => {
            setIsLoading(true);
            dispatch(productActions.getAllProducts((error, result) => {
                if (error) {
                    console.log("Error from Home : ", error);
                    setIsLoading(false);
                    return;
                }
                console.log("Result from Home: ", result);
                setIsLoading(false);
            }))
        };
        fetchAllProduct();
    }, [dispatch]);


    const onRefresh = React.useCallback(() => {
        setIsLoading(true);
        setRefreshing(true);
        const fetchAllProduct = async () => {
            dispatch(productActions.getAllProducts((error, result) => {
                if (error) {
                    console.log("Error from Home : ", error);
                    setRefreshing(false);
                    setIsLoading(false);
                    return;
                }
                console.log("Result from Home: ", result);
                setRefreshing(false);
                setIsLoading(false);
            }))
        };
        fetchAllProduct();
    }, [dispatch]);


    const openDrawer = () => {
        props.navigation.openDrawer();
    }
    const fishCards = products.map(product => (
        <TouchableOpacity key={product.id} onPress={() => props.navigation.navigate('ProductDetails', product)}>
            <FishCard image={product.image}
                fishType={product.fishCategory}
                fishName={product.fishName}
                location={product.location}
                price={product.price}
                unit={product.unit}
                postedAt={product.createdAt}
                rating={3.5}
                saveBtn={false} />
        </TouchableOpacity>
    ));
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header onOpenDrawer={openDrawer}></Header>
            <ScrollView scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.bodyContainer}>
                    <Text style={styles.heading}>Introducing Fistore Marketplace</Text>
                    <Text style={styles.caption}>A collection of verified, best quality and low cost Fish Market and Aqurium Center</Text>
                    <View style={styles.marketContainer}>
                        <Swiper activeDotColor='red' dotColor={colors.hover} autoplay={true} autoplayDirection={true} showsPagination={false} autoplayTimeout={2}>
                            <MarketCard name="World Famous Fish Center" contactNo="8170990726" image={images.market_1} />
                            <MarketCard name="World Famous Aqurium Center" contactNo="8170990726" image={images.aqurium_1} />
                            <MarketCard name="World Famous Fish Center" contactNo="8170990726" image={images.market_2} />
                            <MarketCard name="World Famous Aqurium Center" contactNo="8170990726" image={images.aqurium_2} />
                            <MarketCard name="World Famous Fish Center" contactNo="8170990726" image={images.market_3} />
                            <MarketCard name="World Famous Aqurium Center" contactNo="8170990726" image={images.aqurium_3} />
                            <MarketCard name="World Famous Fish Center" contactNo="8170990726" image={images.market_4} />
                        </Swiper>
                    </View>
                    <Text style={styles.heading}>Explore Categories</Text>
                    <View style={styles.categoryContainer}>
                        <TouchableOpacity style={styles.categoryBtn} onPress={() => props.navigation.navigate('ProductOverview', 'Spawn')}>
                            <View style={styles.categoryIcon}>
                                <Image source={images.seed_fish} style={styles.categoryImg}></Image>
                            </View>
                            <Text style={styles.categroryBtnText}>Spawn Fish</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryBtn} onPress={() => props.navigation.navigate('ProductOverview', 'Seed')}>
                            <View style={styles.categoryIcon}>
                                <Image source={images.fish_seed} style={styles.categoryImg}></Image>
                            </View>
                            <Text style={styles.categroryBtnText}>Seed Fish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryBtn} onPress={() => props.navigation.navigate('ProductOverview', 'Aqurium')}>
                            <View style={styles.categoryIcon}>
                                <Image source={images.aqurium_fish} style={styles.categoryImg}></Image>
                            </View>
                            <Text style={styles.categroryBtnText}>Aqurium Fish</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.categoryContainer, , { marginTop: 10 }]}>
                        <TouchableOpacity style={styles.categoryBtn} onPress={() => props.navigation.navigate('ProductOverview', 'Fish')}>
                            <View style={styles.categoryIcon}>
                                <Image source={images.fish} style={styles.categoryImg}></Image>
                            </View>
                            <Text style={styles.categroryBtnText}>Fish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryBtn} onPress={() => props.navigation.navigate('ProductOverview', 'Sea Fish')}>
                            <View style={styles.categoryIcon}>
                                <Image source={images.sea_fish} style={styles.categoryImg}></Image>
                            </View>
                            <Text style={styles.categroryBtnText}>Sea Fish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryBtn} onPress={() => props.navigation.navigate('ProductOverview', 'All')}>
                            <View style={styles.categoryIcon}>
                                <FontAwesome name="arrow-right" size={30} color="#fff" />
                            </View>
                            <Text style={styles.categroryBtnText}>See all..</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ backgroundColor: 'white', paddingBottom: 20, marginTop: 10 }}>
                    <Text style={[styles.heading, { marginBottom: 10 }]}>Top Rated Collections</Text>
                    {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20, marginTop: 10 }}>
                        <ActivityIndicator size='large' color={colors.primary}></ActivityIndicator>
                    </View> :
                        <View style={styles.fishContainer}>
                            {fishCards}
                        </View>}
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
        letterSpacing: 1,
        color: colors.textColor,
        alignSelf: 'center',
        fontFamily: 'sans-serif'
    },
    caption: {
        fontSize: 15,
        marginTop: 5,
        paddingHorizontal: 13,
        color: 'grey',
        textAlign: 'center'
    },
    categoryContainer: {
        // height: 130,
        // marginTop: 10,
        // marginBottom: 15,
        // marginRight: 10,
        // -------------------
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center'
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 80,
        height: 80,
        backgroundColor: colors.hover,
        borderRadius: 50,
        padding: 3
    },
    categoryImg: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
        height: null,
        resizeMode: 'cover',
        borderRadius: 50
    },
    categroryBtnText: {
        alignSelf: 'center',
        marginTop: 5,
        color: colors.primary,
        fontWeight: '700',
        fontFamily: 'Roboto'
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
        // justifyContent: 'space-evenly',
        marginBottom: 10,
        marginLeft: 2
    }

});


export default Home;