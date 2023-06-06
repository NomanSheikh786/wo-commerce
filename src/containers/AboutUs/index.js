import React from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { height, width } from 'react-native-dimension'
import { ImageBackground } from 'react-native'
import { aboutPic, backArrowWhite } from '../../assets/Images'



const AboutUs = ({ navigation }) => {
    return (
        <SafeAreaView style={styless.container}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <ImageBackground source={aboutPic} style={styless.bgImage} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={backArrowWhite} style={{ width: 15, resizeMode: "contain" }} />
                    </TouchableOpacity>
                    <View style={styless.headingWrapper}>
                        <Text style={styless.headingTitle}>ABOUT US</Text>
                        {/* <TouchableOpacity onPress={() => navigation.navigate("Search") }>
                            <Image source={require('../../Assest/Images/Icon_Search.png')} style={{ tintColor: "#fff" }} />
                        </TouchableOpacity> */}
                    </View>
                </ImageBackground>
                <View style={styless.contentWrapper}>
                    <Text style={styless.headingText}>Lorem ipsum</Text>
                    <Text style={styless.aboutText}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur.
                        {"\n"}
                    </Text>
                    <Text style={styless.aboutText}>
                        Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        {"\n"}
                    </Text>
                    <Text style={styless.aboutText}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styless = StyleSheet.create({

    container: {
        flex: 1
    },
    headingWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10
    },
    headingTitle: {
        fontSize: 18,
        color: "white"
    },
    bgImage: {
        height: height(40),
        width: width(100),
        padding: 10,
        resizeMode: "contain",
        backgroundColor: "#F2F2F2"
    },
    contentWrapper: {
        marginTop: height(5),
        padding: 10
    },
    headingText: {
        fontSize: 19,
        color: "black",
        lineHeight: 34
    },
    aboutText: {
        fontSize: 14,
        color: "black"
    }

})

export default AboutUs