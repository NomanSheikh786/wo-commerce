import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { vh, vw } from '../../constants'

const TouchableButton = (props) => {
    return (
        <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity onPress={props.onPress} style={{ backgroundColor: "#471F65", height: vh * 0.08, width: props.width ? props.width : vw / 1.3, borderRadius: 30, alignItems: "center", justifyContent: "center", paddingVertical: 5 }}>
                <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>{props.Text}</Text>
            </TouchableOpacity>
        </View>
    )

}

export default TouchableButton