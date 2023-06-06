import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { height, width } from 'react-native-dimension';
import Backbutton from '../../../components/BackButton';
import TextField from '../../../components/TextField';
import { Alert } from 'react-native';


const Address = ({ navigation, route }) => {
    let couponLines = route.params.couponLines
    const [inputValues, setInputValues] = useState({
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        email: '',
        phone: ''
    })

    const handleChangeInputs = (name, value) => {
        setInputValues({ ...inputValues, [name]: value })
    }

    const handleNavigateToSummary = () => {

        const { first_name, last_name, address_1, address_2, city, state, postcode, country, email, phone } = inputValues

        if (first_name == "") {
            Alert.alert('Validation Error', 'First name is required')
        }
        else if (email == "") {
            Alert.alert('Validation Error', 'Email is required')
        } else if (phone == "") {
            Alert.alert('Validation Error', 'Phone Number is required')
        } else if (address_1 == "") {
            Alert.alert('Validation Error', 'Address is required')
        } else if (city == "") {
            Alert.alert('Validation Error', 'City is required')

        } else if (state == "") {
            Alert.alert('Validation Error', 'State is required')

        } else if (country == "") {
            Alert.alert('Validation Error', 'Country is required')

        } else {
            navigation.navigate("Summary", { addressData: inputValues })
        }
        // navigation.navigate("Summary", { addressData: inputValues, couponLines })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Backbutton onPress={() => navigation.goBack()} />
            <View style={styles.searchHeader}>
                <Text style={styles.searchHeaderText}>
                    Checkout
                </Text>
                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("SearchEnigne") }} style={{ marginHorizontal: 10 }}>
                        <Image source={SearchIcon} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ margin: width(4), flex: 1, justifyContent: "center" }}>
                    <Text style={styles.searchHeaderText}>
                        Address
                    </Text>
                    <View style={{ marginVertical: width(2), flexDirection: "row", }}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.inputLabel}>First Name</Text>
                            <TextField styles={styles.inputText} value={inputValues.first_name} handleChangeInput={(value) => handleChangeInputs("first_name", value)} placeHolderText="John" placeHolderTextColor="#000" />
                        </View>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.inputLabel}>Last Name</Text>
                            <TextField styles={styles.inputText} value={inputValues.last_name} handleChangeInput={(value) => handleChangeInputs("last_name", value)} placeHolderText="Doe" placeHolderTextColor="#000" />
                        </View>
                    </View>
                    <View style={{ marginVertical: width(2), flexDirection: "row", }}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextField styles={styles.inputText} value={inputValues.email} handleChangeInput={(value) => handleChangeInputs("email", value)} placeHolderText="John@gmail.com" placeHolderTextColor="#000" />
                        </View>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.inputLabel}>Phone Number</Text>
                            <TextField keyboardType="numeric" styles={styles.inputText} value={inputValues.phone} handleChangeInput={(value) => handleChangeInputs("phone", value)} placeHolderText="+1XXXXXXXX" placeHolderTextColor="#000" />
                        </View>
                    </View>
                    <View style={{ marginVertical: width(5) }}>
                        <Text style={styles.inputLabel}>Street 1</Text>
                        <TextField styles={styles.inputText} value={inputValues.address_1} handleChangeInput={(value) => handleChangeInputs("address_1", value)} placeHolderText="12,Bay" placeHolderTextColor="#000" isMultiline />
                    </View>
                    <View style={{ marginVertical: width(2) }}>
                        <Text style={styles.inputLabel}>Street 2</Text>
                        <TextField styles={styles.inputText} value={inputValues.address_2} handleChangeInput={(value) => handleChangeInputs("address_2", value)} placeHolderText="12,Bay" placeHolderTextColor="#000" isMultiline />
                    </View>
                    <View style={{ marginVertical: width(2) }}>
                        <Text style={styles.inputLabel}>City</Text>
                        <TextField styles={styles.inputText} value={inputValues.city} handleChangeInput={(value) => handleChangeInputs("city", value)} placeHolderText="Sharps Rd." placeHolderTextColor="#000" />
                    </View>
                    <View style={{ marginVertical: width(2) }}>
                        <Text style={styles.inputLabel}>Postal Code</Text>
                        <TextField keyboardType="numeric" styles={styles.inputText} value={inputValues.postcode} handleChangeInput={(value) => handleChangeInputs("postcode", value)} placeHolderText="33222" placeHolderTextColor="#000" />
                    </View>
                    <View style={{ marginVertical: width(2), flexDirection: "row", }}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.inputLabel}>State</Text>
                            <TextField styles={styles.inputText} value={inputValues.state} handleChangeInput={(value) => handleChangeInputs("state", value)} placeHolderText="Melbourne" placeHolderTextColor="#000" />
                        </View>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.inputLabel}>Country</Text>
                            <TextField styles={styles.inputText} value={inputValues.country} handleChangeInput={(value) => handleChangeInputs("country", value)} placeHolderText="Australia" placeHolderTextColor="#000" />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: width(2), alignSelf: "center" }}>
                        <TouchableOpacity onPress={handleNavigateToSummary} style={{ backgroundColor: "#471F65", alignItems: 'center', padding: 10, borderRadius: 25, height: width(10), width: width(30), marginTop: height(1.5) }}>
                            <Text style={{ color: "#fff", fontSize: 15, }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: width(3),
        alignItems: 'center'
    },
    searchHeaderText: {
        fontSize: 18,
        textTransform: "uppercase",
        lineHeight: 32,
        color: '#000'
    },
    inputLabel: {
        fontSize: 14,
        color: "#000",
        opacity: 0.5
    },
    inputText: {
        fontSize: 16,
        color: "#000",
        borderBottomColor: "#BDC4CC",
        borderBottomWidth: 1
    }
})

export default Address;
