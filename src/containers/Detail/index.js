import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import WooCommerce from '../../services/Woocommerce';
import { actions } from "../../redux/Actions"
import DetailComponent from './DetailComponent';
import { routes } from '../../navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Detail = ({ navigation }) => {
    const initialProduct = {
        id: 1,
        name: '',
        price: 0,
        description: '',
        average_rating: '',
        images: []
    };
    const [product, setProduct] = useState(initialProduct);
    const [imagesShown, showImages] = useState(false);
    const route = useRoute('Detail')
    const dispatch = useDispatch();

    const handlers = {
        handleShowImages: () =>
            showImages((prevState) => !prevState),
        addToCart: (product) => {
            navigation.navigate('Orders', { screen: routes.Cart });
            return dispatch(actions.addToCart(product));
        }
    };

    useEffect(() => {
        WooCommerce.get(`/products/${route.params.id}`).then(({ data }) => {
            setProduct(data);
        });
    }, [route.params.id]);

    return (
        <DetailComponent
            {...handlers}
            imagesShown={imagesShown}
            product={product}
        />
    );
};

export default Detail;
