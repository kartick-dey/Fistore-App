import React, {} from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, Alert, ImageBackground, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../constants/colors';
import images from '../constants/images';

const width = Dimensions.get('window').width;

const EditProfile = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row', width: '30%' }}>
                    <Icon name='arrow-back-outline' size={30} color="#000" style={{ padding: 10 }} />
                    <Text style={styles.backBtnText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert("Profile", "Saved It")} style={styles.saveBtn}>
                    <Icon name="save-outline" style={styles.saveBtnIcon} color='#fff' size={16} />
                    <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
            </View>
            <ScrollView scrollEventThrottle={16} style={{flex: 1}}>
            <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: width / 5, alignItems: 'center' }}>
                <View style={styles.formContainer}>
                    <View style={styles.formControl}>
                        <View style={[styles.inputContainer, { borderColor: '#fff', elevation: 0 }]}>
                            <View style={styles.imageContainer}>
                                <ImageBackground blurRadius={2} source={images.avater} style={styles.profileImage}></ImageBackground>
                            </View>
                        </View>
                        <View style={{ marginTop: width / 4 }}>
                                <TouchableOpacity onPress={() => Alert.alert("Select a image", "Upload image")} style={styles.uploadImageBtn}>
                                    <Icon name="cloud-upload-outline" size={50} color='#000' />
                                    <Text style={{ color: '#000', fontWeight: '700' }}>Select a Image</Text>
                                </TouchableOpacity>
                            </View>
                        <View style={[styles.inputContainer, { marginTop: width / 7 }]}>
                            <TextInput placeholder="Your Name" autoCorrect keyboardType="default" autoCapitalize="words" style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.formControl}>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.formControl}>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Fishery Name" autoCorrect autoCapitalize="words" style={styles.input} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Products" autoCorrect multiline={true} autoCapitalize="words" style={styles.input} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Your Name" autoCapitalize="words" />
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 50,
        width: width,
        backgroundColor: colors.bgColor,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backBtnText: {
        padding: 14,
        paddingLeft: 5,
        fontSize: 22,
        fontWeight: 'bold'
    },
    saveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: colors.primary,
        borderRadius: 100,
        margin: 10
    },
    saveBtnText: {
        paddingLeft: 5,
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: '700',
        letterSpacing: 1,
        color: '#fff'
    },
    saveBtnIcon: {
        alignSelf: 'center',
        // padding: 10,
    },
    formContainer: {
        width: width - 20,
        padding: 5,
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    formControl: {
        paddingHorizontal: 10
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    inputContainer: {
        marginVertical: 5,
        paddingHorizontal: 20,
        // paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 50,
        // elevation: 1
    },
    imageContainer: {
        alignSelf: 'center',
        width: width / 3,
        height: width / 3,
        borderRadius: width / 6,
        overflow: 'hidden',
        position: 'absolute',
        marginTop: - width / 6,
        borderColor: '#ccc',
        borderWidth: 4,
        elevation: 1
    },
    uploadImageBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10 },
    profileImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default EditProfile;