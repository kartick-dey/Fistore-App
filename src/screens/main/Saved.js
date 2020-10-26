import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/header';


const Saved = (props) => {
  // const savedProducts = useSelector(state => state.propucts.userProducts);
  const openDrawer = () => {
    props.navigation.openDrawer();
  }

  return (
    <View style={{ flex: 1 }}>
      <Header onOpenDrawer={openDrawer}></Header>
      <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> Saved Screen </Text>
      {/* <FlatList
        keyExtractor={(item) => item._id}
        data={savedProducts}
        renderItem={(item) => <Text>{item.fishName}</Text>} /> */}
    </View>
  );
};

export default Saved;
