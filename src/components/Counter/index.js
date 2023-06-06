import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { height, width } from 'react-native-dimension'
import { plus, minus } from '../../assets/Images'

const noop = () => { };

export default function Counter({ quantity = 0, addQuantity = noop, subQuantity = noop, id }) {
    const [conter, setConter] = useState(1)

    const add = () => {
        setConter(conter + 1)
    }
    const sub = () => {
        if (conter < 1) {
            setConter(1)
        }
        else {
            setConter(conter - 1)
        }

    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F6EEEE', justifyContent: "space-between", width: width(25), borderRadius: 30, height: height(5) }}>
            <TouchableOpacity onPress={() => subQuantity(id)} style={{ marginHorizontal: 10, alignItems: 'center' }}><Image source={minus} style={{ height: 14, width: 14, resizeMode: "contain" }} /></TouchableOpacity>
            <View><Text style={{ fontSize: 20, color: '#343434' }}> {quantity}</Text></View>
            <TouchableOpacity onPress={() => addQuantity(id)} style={{ marginHorizontal: 10, alignItems: 'center' }}><Image source={plus} style={{ height: 14, width: 14, resizeMode: "contain" }} /></TouchableOpacity>
        </View>
    )
}