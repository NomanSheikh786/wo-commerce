import Spinner from 'react-native-loading-spinner-overlay';
import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loader = ({ isloading }) => {
    return (
        <Spinner
            visible={isloading}
            color="#471F65"
            size="normal"
            customIndicator={<ActivityIndicator size="large" color="#471F65" />}
        />
    );
};

export default Loader;
