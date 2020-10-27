import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductOverviewCard from '../../components/Home/ProductOverviewCard';

const ProductOverview = (props) => {
  return (
    <View style={{ flex: 1}}>
      <ScrollView>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      <ProductOverviewCard></ProductOverviewCard>
      </ScrollView>
    </View>
  );
};

export const ProductOverviewScreenOption = (navData) => {
  const category = navData.route.params;
  const headerTitle = category + ' ' + 'Product Overview'
  return {
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerBackTitleVisible: false,
    title: headerTitle,
    headerTitleAlign: 'center',
  }
};

const styles = StyleSheet.create({});

export default ProductOverview;
