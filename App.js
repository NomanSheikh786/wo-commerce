import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import ProductItem from "./src/components/ProductItem";
import { Provider } from "react-redux";
import Navigation from "./src/navigation";
import { createStore } from "redux";
import { store, persistor } from "./src/redux"
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigation />
          <Toast />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  )
}

export default App