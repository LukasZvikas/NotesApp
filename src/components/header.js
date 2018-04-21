import React, { Component } from "react";
import { Text, View } from "react-native";

const Header = props => {
  const { textStyle, viewStyle } = Styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>Your Notes</Text>
    </View>
  );
};

const Styles = {
  viewStyle: {
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.4
  },
  textStyle: {
    fontSize: 20
  }
};

export default Header;