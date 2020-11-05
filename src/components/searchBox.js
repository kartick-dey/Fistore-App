import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';


const SearchBox = (props) => {
    const location = props.location || 'Bankura';
    const locationLength = location.length;
    return (
        <View style={{ height: locationLength <= 20 ? 55 : 65, width: '100%', backgroundColor: colors.bgColor, flexDirection: 'row', padding: 5 }}>
            <View style={{ height: '100%', width: '25%', backgroundColor: '#fff', borderRadius: 5 }}>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: '30%', paddingLeft: 5 }}>
                        <MaterialIcons name="my-location" size={20} color="grey" />
                    </View>
                    <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: '70%', paddingHorizontal: 3 }}>
                        <Text style={{ color: 'grey', fontSize: 12 }}>Nearby</Text>
                        <Text style={{ color: colors.textColor, fontWeight: 'bold' }}>{location}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#fff', width: '73.5%', marginHorizontal: 5, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Feather name="search" size={20} color="grey" />
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <TextInput placeholderTextColor="#ccc" autoCorrect onSubmitEditing={() => Alert.alert("Serach", "Clicked")} placeholder="Search by Fish" style={{ width: '100%' }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default SearchBox;