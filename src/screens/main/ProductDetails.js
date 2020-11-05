import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Platform, Dimensions, StatusBar, TouchableOpacity, Animated } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import Images from '../../constants/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../constants/colors';
import { useSelector } from 'react-redux';

import FishCard from '../../components/FishCard';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const { width } = Dimensions.get('window');

const ProductDetails = (props) => {
  const selectedProduct = props.route.params;
  const [saved, setSaved] = React.useState(false);
  const navTitleView = useRef(null);
  let postedAt;
  if ((new Date().getDay() - new Date(selectedProduct.createdAt).getDay()) === 0) {
    postedAt = 'Today'
  } else {
    postedAt = +(new Date().getDay() - new Date(selectedProduct.createdAt).getDay()) + ' day ago';
  }
  const allProducts = useSelector(state => state.products.products);
  const relatedProducts = allProducts.filter(product => product.fishCategory === selectedProduct.fishCategory);
  const fishCards = relatedProducts.map(product => (
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
    <View style={styles.container}>
      <StatusBar barStyle='light-content'></StatusBar>
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() =>
          (<Image source={{ uri: selectedProduct.image }} style={styles.image} />)
        }

        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{selectedProduct.fisheryName}</Text>
          </View>
        )}

        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{selectedProduct.fisheryName}</Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(200)}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10 }} onPress={() => setSaved(!saved)}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome name={saved ? 'bookmark' : 'bookmark-o'} size={25} color={colors.primary} />
                  <Text>{saved ? 'Saved' : 'Save'}</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.title}>{selectedProduct.fishName}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Posted:</Text>
                  <Text style={{ paddingHorizontal: 5 }}>{postedAt}</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', alignSelf: 'center' }}>
              <FontAwesome name='star' size={16} color='#F89C0F' />
              <Text style={{ marginHorizontal: 5 }}>Rating: 5</Text>
              <Text>(102)</Text>
            </View>
          </View>
        </TriggeringView>
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <View style={styles.detailsSection}>
            <View style={styles.details}>
              <Text>Category:</Text>
              <Text>{selectedProduct.fishCategory}</Text>
            </View>
            <View style={styles.details}>
              <Text>Provider: </Text>
              <Text>{selectedProduct.username}</Text>
            </View>
            <View style={styles.details}>
              <Text>Location:</Text>
              <Text>{selectedProduct.location}</Text>
            </View>
            <View style={styles.details}>
              <Text>Available From:</Text>
              <Text>{new Date(selectedProduct.createdAt).toDateString()}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name='inr' size={18} color={colors.primary} />
              <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 25, color: colors.primary }}>{selectedProduct.price}</Text>
                <Text style={{ fontSize: 25, color: colors.primary }}>/</Text>
                <Text style={{ fontSize: 25, color: colors.primary }}>{selectedProduct.unit.toLowerCase()}</Text>
              </View>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={styles.btn}>
                <Icon name="phone-call" size={14} color='#fff' style={{ alignSelf: 'center' }}></Icon>
                <Text style={styles.btnTitle}>Call Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <FontAwesome name="comments" size={18} color='#fff' style={{ alignSelf: 'center' }} />
                <Text style={styles.btnTitle}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Decription:</Text>
            <Text style={styles.sectionContent}>{selectedProduct.description}</Text>
          </View>
        </View>
        <View style={styles.relatedProducts}>
          <Text style={[styles.sectionTitle, { alignSelf: 'center', paddingBottom: 20 }]}>Related Fish Collections</Text>
          <View style={styles.fishContainer}>
            {fishCards}
          </View>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: MAX_HEIGHT,
    width: width,
    alignSelf: 'stretch',
    resizeMode: 'cover'
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: '#000',
    // backgroundColor: 'transparent',
    // fontSize: 24,
    fontSize: 24,
    // color: colors.textColor,
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    textTransform: "capitalize"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  name: {
    fontWeight: 'bold'
  },
  section: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  sectionContent: {
    fontSize: 15,
    textAlign: 'justify'
  },
  detailsSection: {
    width: width - 100,
    alignSelf: 'center',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignSelf: 'stretch'
  },
  priceContainer: {
    padding: 30,
    alignSelf: 'center'
  },
  btnContainer: {
    flexDirection: 'column-reverse',
    width: width - 100,
    alignSelf: 'center'
  },
  btn: {
    width: '45%',
    height: width * 0.09,
    backgroundColor: colors.liner,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  btnTitle: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 5
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: 'white'
  },
  relatedProducts: {
    backgroundColor: 'white'
  },
  fishContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-evenly',
    marginBottom: 10,
    marginLeft: 2
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 24,
    backgroundColor: 'grey',
    // fontWeight: 'bold',
    textTransform: "capitalize",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  sectionLarge: {
    minHeight: 300,
  },
});

export default ProductDetails;
