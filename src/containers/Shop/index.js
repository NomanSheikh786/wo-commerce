import React, { useEffect, useState } from 'react';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import WooCommerce from '../../services/Woocommerce';
import ProductItem from '../../components/ProductItem';
import { actions } from '../../redux/Actions';
import ShopComponent from './ShopComponent';
import { routes } from '../../navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Shop = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch(); 

    const handlers = {
        handleProductPress: (id) =>
            navigation.navigate('Detail', { id }),
        addToCart: (product) => {
            navigation.navigate('Orders', { screen: routes.Cart }); 
            return dispatch(actions.addToCart(product));
        },
        removeFromCart: (productId) =>
            dispatch(actions.removeFromCart(productId)),
        addQuantity: (productId) =>
            dispatch(actions.addQuantity(productId)),
        subQuantity: (productId) =>
            dispatch(actions.subQuantity(productId)) 
    };

    useEffect(() => {
        getData()
        // dispatch(actions.logoutUser(null))    
    }, []);

    const getData = () => {
        setIsLoading(true)
        WooCommerce.get(`/products?page=${currentPage}&per_page=10&status=publish`).then((res) => {
            console.log(res.data, "datadatadatadatadata")
            setCurrentPage(currentPage + 1)
            setProducts([...products, ...res.data]);
            setIsLoading(false)
        }).catch((err) => {
            console.log(err, "errerrerrerrerrerr")
            setIsLoading(false)
        })
    }

    return <ShopComponent {...handlers} products={products} getData={getData} isLoading={isLoading} />;
};

export default Shop;
