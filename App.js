import Expo from 'expo';
import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./src/components/header";



export default class App extends Component {
  render() {

    return (
    
     <Provider store={store}>
      <Header/>
     </Provider>
      

    );
  }
}

Expo.registerRootComponent(App);