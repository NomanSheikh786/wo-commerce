import React from "react";
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { height, width } from "react-native-dimension";
import { BlurView } from "@react-native-community/blur";
import { close } from "../../assets/Images";

const ConfirmationModal = ({ modalVisible, setModalVisible, navigation, icon, title, description, isCheckout, modalHeight, confirmOnPress, cancelOnPress, cancelText, confirmText, isLogin,singleButtonText }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <BlurView
                style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                blurType="light"
                blurAmount={10}
            />

            <View style={styles.centeredView}>
                <View style={[styles.modalView, { height: modalHeight ? modalHeight : height(35) }]}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ alignSelf: 'flex-end', padding: 5, marginVertical: 5 }}>
                        <Image source={close} resizeMode='contain' style={{ height: 20 }} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', backgroundColor: "#D5BAE9", borderRadius: 50, padding: width(2), width: width(15), height: width(15), alignSelf: "center", justifyContent: "center" }}>
                        <Image source={icon} resizeMode='contain' style={{ height: height(9) }} />
                    </View>
                    <View style={{ marginHorizontal: width(0.5), alignItems: 'center', marginVertical: 5 }}>
                        <Text style={{ color: '#0C0D34', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', textAlign: "center" }}>
                            {title}
                        </Text>
                        <Text style={{ color: '#0C0D34', fontSize: 12, marginTop: height(1), opacity: 0.7,textAlign:"center",width:"60%" }}>{description}</Text>
                        {
                            isCheckout ?
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%", }}>
                                    <TouchableOpacity onPress={confirmOnPress} style={{ alignItems: 'center', padding: 10, borderRadius: 25, height: width(10), width: width(25), marginTop: height(1.5), borderColor: "#0C0D34", borderWidth: 1 }}>
                                        <Text style={{ color: "#333333", fontSize: 15, fontWeight: 'bold' }}>
                                            {confirmText}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={cancelOnPress} style={{ backgroundColor: "#471F65", alignItems: 'center', padding: 10, borderRadius: 25, height: width(10), width: width(25), marginTop: height(1.5) }}>
                                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>
                                            {cancelText}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                isLogin ?
                                    <TouchableOpacity onPress={navigation} style={{ backgroundColor: "#471F65", alignItems: 'center', padding: 15, borderRadius: 30, height: height(7), width: width(40), marginTop: height(1.5) }}>
                                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>
                                            {singleButtonText}
                                        </Text>
                                    </TouchableOpacity>

                                    :
                                    null
                        }
                    </View>

                </View>
            </View>

        </Modal>
    )
}

export default ConfirmationModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        height: height(35), width: width(70),
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },


})