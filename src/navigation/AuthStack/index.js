import React from 'react';
import { Login, Register, ResetPassword } from "../../containers/Auth"
import { createStackNavigator } from '@react-navigation/stack';

export const routes = {
    Login: 'Login',
    Register: 'Register',
    ResetPassword: 'ResetPassword',
};


const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator initialRouteName={routes.Login}>
        <Stack.Screen
            name={routes.Login}
            component={Login}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={routes.Register}
            component={Register}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={routes.ResetPassword}
            component={ResetPassword}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
);

export default AuthStack;
