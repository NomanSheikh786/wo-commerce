import React, { useState, useRef } from 'react'
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, StatusBar, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { height, width } from 'react-native-dimension';
import TouchableButton from '../../../components/TouchableButton'
import CustomTextbox from '../../../components/CustomTextbox';
import { logo, onBoarding, symbols } from '../../../assets/Images';
import Loader from '../../../components/Loader';
import axios from 'axios';
import { config } from '../../../services/Woocommerce';

export default function ResetPassword({ navigation }) {


    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        email: "",
    })

    const handleChangeInputs = (name, value) => {
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleSubmit = async () => {
        const { email } = inputValues
        if (!email.length > 0) {
            alert("Please enter email")
        } else if (email.includes == "@") {
            alert("Please enter valid email")
        } else {
            setIsLoading(true)
            try {
                let result = await axios.post(`https://wpdevu5.onlinetestingserver.com/apptestwoo/api/forgot_password.php?email=${email}`)
                if (result?.data) {
                    Alert.alert("Success", result?.data?.msg)
                    navigation.navigate("Login")
                    setInputValues({})
                }
                setIsLoading(false)
            } catch (error) {
                let errorMessage = error?.response?.data?.msg
                Alert.alert("Error", errorMessage)
                setIsLoading(false)
            }
        }

    }




    return (
        <>
            <Loader isloading={isLoading} />
            <ImageBackground source={onBoarding} resizeMode='cover' style={styles.imgb} >
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="dark-content" backgroundColor="#ffff" />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.view}>
                            <Image source={logo} resizeMode='contain' style={{ height: height(20) }} />
                        </View>

                        <View style={styles.welcome}>
                            {/* <View style={{ alignItems: 'center', marginVertical: height(2) }}>
                            <Text style={{ fontSize: 14, color: "#000", padding: 5 }}>
                                Step 1/3
                            </Text>
                            <Image source={require("../Assest/Images/loading1.png")} resizeMode='contain' />
                        </View> */}
                            <Text style={styles.txt}>
                                Forget Password?
                            </Text>
                            <Text style={styles.decs}>
                                Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                            </Text>
                            <CustomTextbox
                                value={inputValues.email}
                                name="email"
                                onChangeText={handleChangeInputs}
                                placeholder={"Info@support.com"} Textboxicon={symbols} />

                            <TouchableButton Text={"Submit"} onPress={() => handleSubmit()} />
                            <View style={styles.rem2}>
                                <Text style={styles.txtacc}>Back To</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <Text style={styles.txtsign}>Login </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgb: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: "center"
    },
    txt: {
        color: "#0C0D34",
        fontWeight: "bold",
        fontSize: 18,

    },
    view: {
        alignItems: "center",
        marginTop: height(2)
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#471F65',
        height: 50,
        borderRadius: 100,
        margin: 10,
        paddingLeft: 10
    },
    searchIcon: {
        height: 15
    },
    View2: {

        marginVertical: 10,
        alignItems: "center",
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: "row",

    },
    txtacc: {
        color: "#000",
        fontWeight: '500',
        fontSize: 14
    },
    txtsign: {
        color: "#FFBC05",
        fontWeight: '500',
        fontSize: 14,
        marginHorizontal: 5
    },
    styles: {
        flexDirection: 'row',
        alignItems: "center",
        padding: 10
    },
    forg: {
        color: "#FFBC05",
        fontWeight: '500',
        fontSize: 16
    },
    rember: {
        color: "#000",
        fontSize: 12,
        fontWeight: '400'
    },
    rowcheck: {
        flexDirection: 'row',
        alignItems: "center",
        marginHorizontal: 9,
    },
    decs: {
        fontSize: 15,
        lineHeight: 24,
        color: "#0C0D34",
        textAlign: 'center',
        fontWeight: "400"
    },
    welcome: {
        alignItems: 'center',
        marginTop: height(2),
        marginHorizontal: width(3)
    },
    rem2: {
        marginTop: height(2),
        flexDirection: "row"
    }

}) 