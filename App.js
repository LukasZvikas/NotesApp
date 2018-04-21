import Expo from 'expo';
import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";
import Header from "./src/components/header";



export default class App extends Component {
  render() {

    return (
    
     <View>
      <Header/>
     </View>
      

    );
  }
}

Expo.registerRootComponent(App);