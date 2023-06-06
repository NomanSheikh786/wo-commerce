import React, { useState, useRef } from 'react'
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView, Alert  } from 'react-native'
import { height, width } from 'react-native-dimension';
import TouchableButton from '../../../components/TouchableButton'
import CustomTextbox from '../../../components/CustomTextbox';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import { group, logo, onBoarding, symbols } from '../../../assets/Images';
import { actions } from '../../../redux/Actions';
import axios from 'axios';
import { config } from '../../../services/Woocommerce';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

export default function Login({ navigation }) {
    const dispatch = useDispatch()
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        token: ""
    })

    const handleChangeInputs = (name, value) => {
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleSubmitLogin = async () => {
        const { email, password,token } = inputValues
        if (!email.length > 0) {
            alert("Please enter email")
        } else if (email.includes == "@") {
            alert("Please enter valid email")
        } else {
            setIsLoading(true)
            try {
                let result = await axios.post(`${config?.WC_BASE_URL}/wp-json/custom/v1/login_user`,{
                    username:email, 
                    password:password,
                    fcm_token:token
                })
                console.log(result.data.user.data, "datadatadatadatadatadata")
                if (result?.data) {
                    dispatch(actions.loginUser(result.data.user.data))
                }
                setIsLoading(false)
            } catch (error) {
                let errorMessage = error?.response?.data?.message?.replace(/<[^>]*>/g, '');
                Alert.alert("Error", errorMessage)
                setIsLoading(false)
            }
        }

    }

    useEffect(() => {
        if (Platform.OS == 'ios') {
            requestUserPermission();
        } else {
            checkPermission();
        }
    }, []);

    const requestUserPermission = async () => {
        try {
            const authStatus = await messaging().requestPermission();
            checkPermission();
        } catch (error) { }
    };

    const checkPermission = async () => {
        try {
            let enabled = await messaging().hasPermission();
            if (enabled) {
                getToken();
            } else {
                requestUserPermission();
            }
        } catch (error) { }
    };

    const getToken = async () => {
        let token = await messaging().getToken();

        messaging().onMessage(async remoteMessage => {
            Alert.alert(remoteMessage.notification.title,remoteMessage.notification.body)
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
          });

        console.log(token,"tokentokentokentoken")
        setInputValues({ ...inputValues, token });
    };


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
                                WELCOME BACK
                            </Text>
                            <Text style={styles.decs}>
                                Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                            </Text>
                            <CustomTextbox
                                value={inputValues.email}
                                name="email"
                                onChangeText={handleChangeInputs} placeholder={"Info@support.com"} Textboxicon={symbols} />

                            <CustomTextbox
                                value={inputValues.password}
                                name="password"
                                onChangeText={handleChangeInputs} placeholder={"Enter Your Password"} Textboxicon={group} secure={true} />
                            <View style={{ width: "92%", alignItems: "flex-start" }}>
                                {/* <View style={styles.rowcheck}>
                                    <CheckBox tintColors={{ true: '#471F65' }}
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                    />
                                    <Text style={styles.rember}>Remember me</Text>
                                </View> */}
                                <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")} >
                                    <Text style={styles.forg}>
                                        Forget Password
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableButton onPress={handleSubmitLogin} Text={"Log into Your Account"} />
                            <View style={styles.rem2}>
                                <Text style={styles.txtacc}>Don't Have An Account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                    <Text style={styles.txtsign}>Sign Up Here</Text>
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
        marginTop: height(10),
        marginHorizontal: width(6)
    },
    rem2: {
        marginTop: height(2),
        flexDirection: "row"
    }

})