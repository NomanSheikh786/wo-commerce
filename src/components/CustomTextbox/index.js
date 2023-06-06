import React, { useState } from 'react'
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from 'react-native-elements';


export default function CustomTextbox(props) {
  const [onfocus, Setonfocus] = useState(false);
  const { isIcon, iconName, iconType, size, value, onChangeText, name } = props
  return (
    <View style={[(onfocus) ? styles.searchSectionFocus : styles.searchSectionBlur, { height: (props?.height) ? props?.height : 50, borderRadius: (props?.borderRadius) ? props?.borderRadius : 100, alignItems: props.isVertical ? "flex-start" : "center" }]}>
      {
        isIcon ?
          <Icon
            name={iconName}
            type={iconType}
            size={size}
            color={onfocus ? "#471F65" : "#707070"}
          />
          :
          <Image style={(onfocus) ? [styles.searchIcon, { height: props.isVertical ? 38 : 15 }] : [styles.searchIconfalse, { height: props.isVertical ? 38 : 15 }]} source={props.Textboxicon} resizeMode='contain' />

      }
      <TextInput
        style={{ flex: 1, color: "#000" }}
        // selection={props?.isActive ? undefined : { start: 0 }}
        numberOfLines={(props?.noOfLines) ? props?.noOfLines : 1}
        multiline={(props?.multiline) ? props?.multiline : false}
        placeholder={props.placeholder}
        underlineColorAndroid="transparent"
        secureTextEntry={props.secure}
        onFocus={() => { Setonfocus(true) }}
        onBlur={() => { Setonfocus(false) }}
        value={value}
        onChangeText={(e) => onChangeText(name, e)}
        placeholderTextColor="#000"
        textAlignVertical={props.isVertical}
      />
    </View>
  )


}
const styles = StyleSheet.create({
  searchSectionBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    // height: (props?.height) ? props?.height : 50,
    // borderRadius: 100,
    margin: 10,
    paddingLeft: 15
  },
  searchSectionFocus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#471F65',
    // height: (props?.height) ? props?.height : 50,
    // borderRadius: 100,
    margin: 10,
    paddingLeft: 15
  },

  searchIcon: {
    height: 15,
    width: 15,
    tintColor: "#471F65",
  },
  searchIconfalse: {
    height: 15,
    width: 15,
    tintColor: "#707070",
  },



})