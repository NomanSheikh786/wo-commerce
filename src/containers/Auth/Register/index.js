import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import { height, width } from 'react-native-dimension';
import TouchableButton from '../../../components/TouchableButton'
import CustomTextbox from '../../../components/CustomTextbox';
import { group, logo, onBoarding, symbols } from '../../../assets/Images';
import Loader from '../../../components/Loader';
import Ionicons from "react-native-vector-icons/Ionicons"
import Woocommerce from '../../../services/Woocommerce';


export default function Register({ navigation }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        password: ""
    })

    const handleChangeInputs = (name, value) => {
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleSubmitLogin = async () => {
        const { email, password, first_name, last_name, username } = inputValues
        if (!email.length > 0) {
            alert("Please enter email")
        } else if (email.includes == "@") {
            alert("Please enter valid email")
        } else {
            setIsLoading(true)
            try {
                let payload = {
                    email,
                    first_name,
                    last_name,
                    username,
                    password
                }
                let result = await Woocommerce.post('/customers', payload)
                if (result?.data) {
                    Alert.alert("Success", "User Registered Successfully")
                }
                navigation.navigate("Login")
                setIsLoading(false)
            } catch (error) {
                let errorMessage = error?.response?.data?.message?.replace(/<[^>]*>/g, '');
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
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={styles.view}>
                            <Image source={logo} resizeMode='contain' style={{ height: height(20) }} />
                        </View>

                        <View style={styles.welcome}>
                            <Text style={styles.txt}>
                                Create Account
                            </Text>
                            <Text style={styles.decs}>
                                Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                            </Text>
                            <CustomTextbox
                                value={inputValues.username}
                                name="username"
                                onChangeText={handleChangeInputs}
                                placeholder={"@john"}
                                isIcon
                                iconName="person-outline"
                                iconType="ion-icon"
                                size={20}
                            />
                            <CustomTextbox
                                value={inputValues.first_name}
                                name="first_name"
                                onChangeText={handleChangeInputs}
                                placeholder={"John"}
                                isIcon
                                iconName="text-color"
                                iconType="foundation"
                                size={20}
                            />
                            <CustomTextbox
                                value={inputValues.last_name}
                                name="last_name"
                                onChangeText={handleChangeInputs}
                                placeholder={"Doe"} isIcon iconName="text-color" iconType="foundation" size={20} />
                            <CustomTextbox
                                value={inputValues.email}
                                name="email"
                                onChangeText={handleChangeInputs}
                                placeholder={"John@gmail.com"} Textboxicon={symbols} />
                            <CustomTextbox
                                value={inputValues.password}
                                name="password"
                                onChangeText={handleChangeInputs}
                                placeholder={"Enter Password"} Textboxicon={group} secure={true} />
                            <TouchableButton onPress={handleSubmitLogin} Text={"Create an Account"} />
                            <View style={styles.rem2}>
                                <Text style={styles.txtacc}>Already Have An Account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <Text style={styles.txtsign}>Login Here</Text>
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
        marginTop: height(7),
        marginHorizontal: width(3)
    },
    rem2: {
        marginTop: height(2),
        flexDirection: "row"
    }

}) 