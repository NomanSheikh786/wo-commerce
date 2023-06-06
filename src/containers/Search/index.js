import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity,SafeAreaView } from 'react-native'
import Backbutton from '../../components/BackButton'
import { height, width } from 'react-native-dimension'
import { search as SearchIcon,cancelIcon } from "../../assets/Images"

const Search = ({ navigation }) => {
    const [onfocus, Setonfocus] = useState(false);
    const [search, setsearch] = useState("")
    
    return (
        <SafeAreaView style={styles.container}>
            <Backbutton onPress={() => navigation.goBack()} />

            <View style={styles.searchHeader}>
                <Text style={styles.searchHeaderText}>
                    Search
                </Text>
                {/* <TouchableOpacity>
                    <Image source={filter} style={{ resizeMode: 'contain' }} />
                </TouchableOpacity> */}
            </View>
            <View style={{ marginTop: height(2) }}>
                <View style={(onfocus) ? styles.searchSectionFocus : styles.searchSectionBlur}>
                    <Image style={(onfocus) ? styles.searchIcon : styles.searchIconfalse} source={SearchIcon} resizeMode='contain' />
                    <TextInput
                        style={{ flex: 1, color: "#000" }}
                        placeholder={"Search"}
                        placeholderTextColor="#000"
                        underlineColorAndroid="transparent"
                        onFocus={() => { Setonfocus(true) }}
                        onBlur={() => { Setonfocus(false) }}
                        value={search}
                        onChangeText={setsearch}
                        onSubmitEditing={() => navigation.navigate('Products', { searchValue: search })}
                        returnKeyType="search"
                    />
                    <TouchableOpacity onPress={() => setsearch('')} style={{ marginRight: width(4) }}>
                        <Image style={(onfocus) ? styles.searchIcon : styles.searchIconfalse} source={cancelIcon} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchHeader: {
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
    searchSectionBlur: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        height: 50,
        borderRadius: 100,
        margin: 10,
        paddingLeft: 15
    },
    searchSectionFocus: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#0000',
        height: 50,
        borderRadius: 100,
        margin: 10,
        paddingLeft: 15
    },

    searchIcon: {
        height: 15,
        width: 15,
        tintColor: "#000"

    },
    searchIconfalse: {
        height: 15,
        width: 15,
        tintColor: "#707070"

    },
})

export default Search