import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
export default function DrawerNavigationItems(props) {

    return (
        <View key={props?.keyy} style={styles.containerheight}>
            <TouchableOpacity onPress={props.onPress} style={styles.touchb}>
                <Image source={props.item.image} resizeMode='contain' style={styles.images} />
                <Text style={styles.text}>{props.item.title}</Text>

            </TouchableOpacity>
            {/* <View
                style={styles.bottomtab}
            /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    containerheight: {
        height: 50,
        paddingLeft: 20
    },

    text: {
        lineHeight: 21,
        color: '#fff',
        fontSize: 14,
        marginHorizontal: 10
    },
    images: {
        height: 22,
        width: 22,
        //  tintColor:"#9179A3"
    },
    touchb: {
        flexDirection: "row",
        alignItems: 'center',

    }


})