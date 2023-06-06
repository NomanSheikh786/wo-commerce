import React, { useState } from 'react'
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { height, width } from 'react-native-dimension';
import CustomTextbox from '../../components/CustomTextbox';
import TouchableButton from '../../components/TouchableButton';
import ConfirmationModal from '../../components/ConfirmationModal';
import { okay, contactBackgroundImage, backArrowWhite, personIcon, emailIcon, messageIcon } from '../../assets/Images';
import axios from 'axios';
import Loader from '../../components/Loader';
import { config } from '../../services/Woocommerce';

const ContactUs = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleChangeInputs = (name, value) => {
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleSubmitContact = async () => {
        const { name, email, subject, message } = inputValues


        if (!name.length > 0) {
            alert("Please enter name")
        } else if (!email.length > 0) {
            alert("Please enter email")
        }
        else if (!email.includes("@")) {
            alert("Please enter valid email")
        }
        else if (!subject.length > 0) {
            alert("Please enter subject")
        } else if (!message.length > 0) {
            alert("Please enter message")
        } else {
            let formData = new FormData()
            formData.append('your-name', name)
            formData.append('your-email', email)
            formData.append('your-subject', subject)
            formData.append('your-message', message)

            setIsLoading(true)
            try {
                let result = await axios({
                    url: `${config?.WC_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/1417/feedback`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                })
                console.log(result.data, "datadatadatadatadata")
                setIsLoading(false) 
                // Alert.alert('Success', result?.data?.message)
                setModalVisible(true)
                setInputValues({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                })
            } catch (error) {
                let errorMessage = error?.response?.data?.message
                console.log(error)
                Alert.alert("Error", errorMessage)
                setIsLoading(false)
            }
        }

    }

    return (
        <>
            <Loader isloading={isLoading} />
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#471F65', '#FBF5E7']} style={{ flex: 1 }}>
                    <ImageBackground source={contactBackgroundImage} style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ padding: 10 }}>
                            <Image source={backArrowWhite} style={{ width: 15, resizeMode: "contain" }} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: "#FFF", marginTop: height(15), borderTopLeftRadius: 45, borderTopRightRadius: 45, padding: 20, flex: 1, alignItems: "center" }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ width: width(90), alignItems: "center" }}>
                                    <Text style={{ fontSize: 20, lineHeight: 35, color: "black" }}>Contact Us</Text>
                                    <Text style={{ fontSize: 12, textAlign: "center", width: "70%", lineHeight: 20 }}>Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam</Text>
                                    <CustomTextbox
                                        value={inputValues.name}
                                        name="name"
                                        onChangeText={handleChangeInputs}
                                        placeholder={"Full Name"} Textboxicon={personIcon} />
                                    <CustomTextbox
                                        value={inputValues.email}
                                        name="email"
                                        onChangeText={handleChangeInputs}
                                        placeholder={"Email Address"} Textboxicon={emailIcon} />
                                    <CustomTextbox
                                        value={inputValues.subject}
                                        name="subject"
                                        onChangeText={handleChangeInputs}
                                        placeholder={"Subject"} Textboxicon={messageIcon} />
                                    <CustomTextbox
                                        value={inputValues.message}
                                        name="message"
                                        onChangeText={handleChangeInputs}
                                        isVertical="top" placeholder={"Message"} Textboxicon={emailIcon} height={height(20)} borderRadius={30} multiline={true} noOfLines={5} />
                                    <TouchableButton onPress={() => handleSubmitContact()} Text={"Submit"} />
                                </View>
                            </ScrollView>
                        </View>
                    </ImageBackground>


                </LinearGradient>
                <ConfirmationModal singleButtonText="Okay" navigation={() => setModalVisible(false)} modalHeight={width(65)} isLogin={true} modalVisible={modalVisible} setModalVisible={setModalVisible} icon={okay} title="Thank You" description="Your Submission has been Received!" isCheckout={false} />
            </SafeAreaView>
        </>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})

export default ContactUs