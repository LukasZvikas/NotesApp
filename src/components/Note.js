import _ from "lodash";
import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import { createNote, updateNote } from "../actions";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.title,
      text: this.props.navigation.state.params.text,
      update: this.props.navigation.state.params.update,
      id: this.props.navigation.state.params.id
    };
  }

  addNote(title, text, update) {
    return this.props.createNote(title, text);
  }

  updateNote(title, text, id) {
    return this.props.updateNote(title, text, id);
  }

  onDone() {
    if (this.state.update && this.state.title != "") {
      console.log("UPDATE");
      this.updateNote(this.state.title, this.state.text, this.state.id);
    } else {
      console.log("CREATE");
      this.addNote(this.state.title, this.state.text);
    }
    return true;
  }
  render() {
    console.log("FROM NAV", this.props.navigation.state);
    return (
      <View>
        <View>
          <FormLabel>>Title</FormLabel>
          <FormInput
            value={this.props.navigation.state.params.title}
            onChangeText={title => {
              this.setState({ title });
            }}
          />
          <FormLabel>Content</FormLabel>
          <FormInput
            value={this.props.navigation.state.params.text}
            onChangeText={text => {
              this.setState({ text });
            }}
          />
        </View>
        <View>
          <Button
            onPress={() => {
              this.setState({ title: "", text: "", update: false });
              this.onDone();
              this.props.navigation.goBack();
            }}
            title={"Done"}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    noteList: state.notes
  };
}

export default connect(mapStateToProps, { createNote, updateNote })(Note);
