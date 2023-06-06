import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { height, width } from 'react-native-dimension'
import { deleteIcon, icons_like } from '../../assets/Images'

export default function WishlistProductCard({ result, navigation, handleRemoveFromWishlist }) {

    const resultdata = ({ item, index }) => {
        let plainDescription = item?.description?.replace(/<[^>]+>/g, '');

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.touch}>
                    <Image source={{ uri: item?.images[0]?.src }} style={styles.img} resizeMode="contain" />
                </TouchableOpacity>

                <View style={styles.container2}>
                    <View style={styles.viewww}>
                        <Text style={styles.texttittle}>{(item?.name?.length > 15) ? item?.name?.substring(0, 15).concat("...") : item?.name}</Text>
                        <Text style={styles.textprice}>
                            ${item?.price ? item?.price : 0}
                        </Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.typee}>{item?.categories[0]?.name}</Text>
                        <Text style={styles.decs}>Description</Text>
                        <Text style={styles.typee}>{(plainDescription?.length > 80) ? plainDescription?.substring(0, 80).concat("...") : plainDescription}</Text>
                    </View>


                    <View style={styles.container3}>
                        <TouchableOpacity onPress={() => handleRemoveFromWishlist(item?.id)}>
                            <Image source={deleteIcon} resizeMode="contain" />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{ marginHorizontal: width(3) }}>
                            <Image source={icons_like} resizeMode="contain" />
                        </TouchableOpacity> */}
                    </View>

                </View>
            </View>
        )
    }
    return (

        <FlatList
            showsVerticalScrollIndicator={false}
            data={result}
            renderItem={resultdata}
            contentContainerStyle={{
                flexGrow: 1,
            }}
            ListEmptyComponent={() => {
                return (
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "#000",
                            fontSize: 18
                        }}>No Products Found</Text>
                    </View>

                )
            }}
        />

    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: width(3),
        marginVertical: 5
    },
    touch: {
        backgroundColor: '#eee',
        borderRadius: 10,
        height: width(34),
        justifyContent: "center",
        alignItems: "center",
        width: width(25)
    },
    img: {
        height: height(10),
        width: width(20)
    },
    container2: {
        margin: 5,
        width: "73%"
    },
    viewww: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    texttittle: {
        fontSize: 16,
        color: '#000',
        lineHeight: 21
    },
    textprice: {
        color: "#471F65",
        fontSize: 16,
        lineHeight: 25
    },
    typee: {
        color: "#707070",
        fontSize: 12,
        lineHeight: 18
    },
    desc: {
        color: "#000",
        fontSize: 12,
        lineHeight: 18,
        marginVertical: 4
    },
    container3: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: width(2)
    }
})