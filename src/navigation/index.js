import React from "react";
import AppStack from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/Actions";
import { useEffect } from "react";
import AuthStack from "./AuthStack";

const Navigation = () => {
    const user = useSelector((state) => state.userReducer.user);

    console.log(user,"useruseruseruseruser")

    return (
        <NavigationContainer>
            {
                user ?
                    <AppStack />
                    :
                    <AuthStack />
            }
            {/* <AppStack /> */}
            {/* <AuthStack/> */}
        </NavigationContainer>
    )
}

export default Navigation