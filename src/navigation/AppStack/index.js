import React from 'react';
import { Icon } from 'react-native-elements';
import Shop from '../../containers/Shop';
import Detail from '../../containers/Detail';
import Cart from "../../containers/Cart"
import Checkout from '../../containers/Checkout';
import { home, catalog, heart, bell, product, call, logout, avatar, close, order } from '../../assets/Images';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DrawerNavigationItems from '../../components/DrawerNavigationItems';
import Home from '../../containers/Home';
import AboutUs from '../../containers/AboutUs';
import Wishlist from '../../containers/Wishlist';
import Notification from '../../containers/Notification';
import Products from '../../containers/Product';
import ContactUs from '../../containers/ContactUs';
import FeaturedProducts from '../../containers/FeaturedProducts';
import { width } from 'react-native-dimension';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTopTabBar from '../../components/HomeTopTabBar';
import Categories from '../../containers/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/Actions';
import ProductDetail from '../../containers/ProductDetail';
import Search from '../../containers/Search';
import Address from '../../containers/Checkout/Address';
import Summary from '../../containers/Checkout/Summary';
import Payment from '../../containers/Checkout/Payment';
import Orders from '../../containers/Orders';
import OrderDetails from '../../containers/OrderDetails/index,';


export const routes = {
  Browse: 'Browse',
  Shop: 'Shop',
  Detail: 'Detail',
  Orders: 'Orders',
  Cart: 'Cart',
  Checkout: 'Checkout',
  Home: 'Home',
  AboutUs: 'AboutUs',
  Wishlist: 'Wishlist',
  Notification: 'Notification',
  Products: 'Products',
  ContactUs: 'ContactUs',
  FeaturedProducts: 'FeaturedProducts',
  Categories: 'Categories',
  ProductDetail: 'ProductDetail',
  Search: 'Search',
  Address: 'Address',
  Summary: 'Summary',
  Payment: 'Payment',
  Orders: 'Orders',
  OrderDetail: 'OrderDetail'
};




function HomeScreen1(navigation) {
  let route = navigation.navigation.scene.descriptor.navigation
  return (
    <>
      <HomeTopTabBar Menu={() => { route.toggleDrawer() }} Search={() => { route.navigate("Search") }} Cart={() => { route.navigate("Cart") }} Filter={() => route.navigate("Filter")} />
    </>
  );
}



const Drawer = createDrawerNavigator();



const AppStack = () => {
  const user = useSelector((state) => state?.userReducer?.user);

  const dispatch = useDispatch()

  const data = [

    {
      id: 1,
      image: home,
      title: "Home",
      screenName: "Home"
    },
    {
      id: 3,
      image: catalog,
      title: "About Us",
      screenName: "AboutUs"

    },
    {
      id: 4,
      image: heart,
      title: "Wishlist",
      screenName: "Wishlist"
    },
    {
      id: 6,
      image: bell,
      title: "Notification",
      screenName: "Notification"
    },
    {
      id: 7,
      image: product,
      title: "Products",
      screenName: "Products"
    },
    {
      id: 8,
      image: order,
      title: "Orders",
      screenName: "Orders"
    },
    {
      id: 9,
      image: call,
      title: "Contact",
      screenName: "ContactUs"
    },
    {
      id: 10,
      image: logout,
      title: "Logout",
      screenName: "logout"
    },

  ]

  const CustomDrawerContent = ({ ...props }) => {


    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { props.navigation.closeDrawer() }} style={styles.touchable}>
          <Image source={close} resizeMode='contain' style={styles.cross} />
        </TouchableOpacity>

        <View style={styles.view2}>
          <Image source={{ uri: user?.user_image }} resizeMode='contain' style={styles.userpr} />
          <View style={styles.bftext}>
            <Text style={styles.username}>{user?.display_name}</Text>
            <Text style={styles.tit}>@{user?.user_login}</Text>
          </View>
        </View>
        <View style={{ marginVertical: width(18) }}>
          {
            data.map((item, index) => {
              return (
                <DrawerNavigationItems keyy={index} item={item} onPress={() => {
                  if (item.screenName == "logout") {
                    // props.navigation.toggleDrawer()
                    dispatch(actions.logoutUser(null))
                  } else {
                    props.navigation.navigate(item.screenName)
                  }
                }} />
              )
            })
          }
        </View>
      </View>
    )
  }


  return (
    <Drawer.Navigator
      initialRouteName={routes.Home}
      // drawerType="slide"              
      drawerContent={CustomDrawerContent}
      drawerStyle={styles.drawerStyle}
      overlayColor='rgba(0,0,0,0.8)'


    >
      <Drawer.Screen name={routes.Home} component={Home} options={{
        headerShown: true,
        header: (navigation) => <HomeScreen1 navigation={navigation} />,
      }} />
      <Drawer.Screen name={routes.AboutUs} component={AboutUs} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Wishlist} component={Wishlist} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Notification} component={Notification} options={{
        headerShown: false,
      }} />

      <Drawer.Screen name={routes.Products} component={Products} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Orders} component={Orders} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.ContactUs} component={ContactUs} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Shop} component={Shop} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Detail} component={Detail} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Cart} component={Cart} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Checkout} component={Checkout} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Categories} component={Categories} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.ProductDetail} component={ProductDetail} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Search} component={Search} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Address} component={Address} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Summary} component={Summary} options={{
        headerShown: false,
      }} />
      <Drawer.Screen name={routes.Payment} component={Payment} options={{
        headerShown: false,
      }} />
       <Drawer.Screen name={routes.OrderDetail} component={OrderDetails} options={{
        headerShown: false,
      }} />
    </Drawer.Navigator>
  )
}

export default AppStack;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  drawerStyle: {
    backgroundColor: "#471F65",
    borderBottomRightRadius: 35,
    borderTopRightRadius: 35,
    width: "80%"
  },
  touchable: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 10
  },
  view2: {
    marginHorizontal: 20
  },
  cross: {
    height: 14
  },
  userpr: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2
  },
  bftext: {
    marginVertical: 10
  },
  username: {
    fontSize: 18,
    lineHeight: 24,
    color: "#FFF"
  },
  tit: {
    fontSize: 16,
    lineHeight: 21,
    color: "#FFF"
  },

});
