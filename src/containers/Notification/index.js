import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { height, width } from 'react-native-dimension'
import { bellYellow, search } from '../../assets/Images'
import Backbutton from '../../components/BackButton'

const Notification = ({ navigation }) => {
    const notidata = [
        {
            id: 1,
            msg: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
            time: "10:00 a.m.",
            date: ' 05/04/21',
            status: 1,

        },
        {
            id: 1,
            msg: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
            time: "10:00 a.m.",
            date: ' 05/04/21',
            status: 0,

        },
        {
            id: 1,
            msg: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
            time: "10:00 a.m.",
            date: ' 05/04/21',
            status: 0,

        },
        {
            id: 1,
            msg: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
            time: "10:00 a.m.",
            date: ' 05/04/21',
            status: 0,

        },
        {
            id: 1,
            msg: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
            time: "10:00 a.m.",
            date: ' 05/04/21',
            status: 0,

        },


    ]
    const NotificationRender = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity style={styles.touch}>
                    <Image source={bellYellow} resizeMode='contain' style={styles.imgszie} />
                    <View style={styles.viewwww}>
                        <Text style={styles.msgg}>
                            {item.msg}
                        </Text>
                        <View style={styles.viewlast}>
                            <Text style={styles.same}>{item.time}</Text>
                            <Text style={styles.same}>|</Text>
                            <Text style={styles.same}>{item.date}</Text>
                            {item.status == 1 ? <View style={styles.statuss}>
                                <Text style={styles.newtext}>New</Text>
                            </View> : null}

                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.hori} />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Backbutton onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.searchHeader}>
                    <Text style={styles.searchHeaderText}>
                        Notifications
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("SearchEnigne")} style={{ marginHorizontal: 10 }}>
                            <Image source={search} style={{ resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: width(4) }}>
                    <FlatList
                        data={notidata}
                        renderItem={NotificationRender}
                    />
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
        marginTop: width(2),
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
    touch: {
        flexDirection: 'row',
        width: width(80),
        marginHorizontal: width(2)
    },
    imgszie: {
        height: 40,
        width: 40
    },
    viewwww: {
        marginHorizontal: 8,
        marginTop: width(1)
    },
    msgg: {
        fontSize: 9,
        lineHeight: 14,
        color: '#666666'
    },
    viewlast: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3
    },
    same: {
        fontSize: 9,
        lineHeight: 13,
        color: '#000'
    },
    statuss: {
        marginHorizontal: 5,
        padding: 2,
        width: width(12),
        borderWidth: 1,
        borderRadius: 30,
        alignItems: 'center',
        borderColor: "#471F65",
        backgroundColor: "#F4E6FF"
    },
    newtext: {
        color: "#471F65",
        fontSize: 9,
    },
    hori: {
        borderWidth: 1,
        borderColor: "#F5F5F5",
        marginVertical: 5,
        marginHorizontal: width(6)
    }
})

export default Notification