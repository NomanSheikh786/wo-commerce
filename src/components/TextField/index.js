import React from "react"
import { TextInput } from "react-native"

const TextField = ({ value, handleChangeInput, placeHolderText, placeHolderTextColor, styles, isMultiline, keyboardType }) => {
    return (
        <TextInput keyboardType={keyboardType} value={value} onChangeText={handleChangeInput} placeholder={placeHolderText} placeholderTextColor={placeHolderTextColor} style={styles} multiline={isMultiline} />
    )
}

export default TextField