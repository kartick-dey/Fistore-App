import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductOverviewCard from '../../components/Home/ProductOverviewCard';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import SearchBox from '../../components/searchBox';

const ProductOverview = (props) => {
  const { category, allProducts } = props.route.params;
  let products;
  if (category !== 'All') {
    products = allProducts.filter(product => product.fishCategory === category.toUpperCase())
  } else {
    products = allProducts;
  }

  const productOverviewCards = products.map(product => (
    <ProductOverviewCard key={product.id} onClick={() => props.navigation.navigate('ProductDetails', product)} product={product}></ProductOverviewCard>
  ));
  return (
    <View style={{ flex: 1 }}>
      <SearchBox />
      {/* <ScrollView> */}
      {productOverviewCards}
      {/* <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard> */}
      {/* </ScrollView> */}
    </View>
  );
};

export const ProductOverviewScreenOption = (navData) => {
  const { category } = navData.route.params;
  const headerTitle = category + ' ' + 'Product'
  return {
    headerStyle: {
      backgroundColor: colors.bgColor,
    },
    headerBackTitleVisible: false,
    title: headerTitle,
    // headerTitleAlign: 'flex-start',
  }
};

const styles = StyleSheet.create({});

export default ProductOverview;
