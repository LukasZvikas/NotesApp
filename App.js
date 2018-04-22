import Expo from "expo";
import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";
import { Provider } from "react-redux";
import { TabNavigator, StackNavigator } from "react-navigation";
import store from "./store";
import Header from "./src/components/header";
import NoteList from "./src/components/NoteList";
import Note from "./src/components/Note";

export default class App extends Component {
  render() {
    const MainNav = StackNavigator(
      {
        noteList: { screen: NoteList },
        newNote: { screen: Note }
      },
      {
        tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    });

    return (
      <Provider store={store}>
        <MainNav />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
