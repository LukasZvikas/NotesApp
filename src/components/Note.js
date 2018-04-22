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

  addNote(title, text) {
    return this.props.createNote(title, text);
  }

  updateNote(title, text, id) {
    return this.props.updateNote(title, text, id);
  }

  onDone(id, check) {
    if (check && this.state.title != "") {
      this.updateNote(this.state.title, this.state.text, id);
    } else {
      this.addNote(this.state.title, this.state.text);
    }
    return true;
  }
  render() {
    const { params } = this.props.navigation.state;
    const noteTitle = params ? params.title : null;
    const noteText = params ? params.text : null;
    const noteCheck = params ? params.update : null;
    const noteId = params ? params.id : null;
    console.log("noteText", noteText)

    return (
      <View>
        <View>
          <FormLabel>>Title</FormLabel>
          <FormInput
            value={noteTitle}
            onChangeText={title => {
              this.setState({ title });
            }}
          />
          <FormLabel>Content</FormLabel>
          <FormInput
            value={noteText}
            onChangeText={text => {
              this.setState({ text });
            }}
          />
        </View>
        <View>
          <Button
            onPress={() => {
              this.onDone(noteId, noteCheck);
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
