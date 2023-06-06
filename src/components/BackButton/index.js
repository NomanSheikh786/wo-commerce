import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { height, width } from 'react-native-dimension'
import { backArrow } from '../../assets/Images'
export default function Backbutton(props) {
  return (
    <View style={{alignItems:"flex-start"}}>
    <TouchableOpacity onPress={props.onPress} style={{marginVertical:height(1),marginHorizontal:width(2)}}>
        <Image source={backArrow} style={{ resizeMode: "contain",width:15,tintColor:(props.color) ? props.color : "#757575" }} />
    </TouchableOpacity>
    </View>
  )
}