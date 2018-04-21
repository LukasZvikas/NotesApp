import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNotes } from "../actions";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import Note from "./Note";

class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = { notes: this.props.noteList };
  }

  renderNotes(noteList) {
    if (noteList.length == 0) {
      return (
        <View>
          <Text>No Notes Yet</Text>
          <Text>No Notes Yet</Text>
          <Text>No Notes Yet</Text>
          <Text>No Notes Yet</Text>
          <Text>No Notes Yet</Text>
        </View>
      );
    }

    return noteList.map(note => {
      return (
        <View>
          <Text />
          <Text />
          <Text />
          <Text />
          <Text
            onPress={() => {
              this.props.navigation.navigate("newNote", {
                title: note.title,
                text: note.text,
                update: true
              });
            }}
          >
            {note.title}
          </Text>
          <Text
            onPress={() => {
              this.props.navigation.navigate("newNote", {
                title: note.title,
                text: note.text,
                update: true
              });
            }}
          >
            {note.title}
          </Text>
          <Text>{note.text}</Text>
          <Text>{note.text}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <View>
        {this.renderNotes(this.props.noteList)}
        <Button
          onPress={() => {
            this.props.navigation.navigate("newNote", {
              title: "",
              text: "",
              update: false
            });
          }}
          title={"Add"}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    noteList: state.notes
  };
}
export default connect(mapStateToProps, { fetchNotes })(NoteList);
