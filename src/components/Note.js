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
      title: "",
      text: "",
      update: this.props.navigation.state.params.update
    };
  }

  addNote(title, text, update) {
    return this.props.createNote(title, text, update);
  } 


  updateNote(title, text, update) {
    return this.props.updateNote(title, text, update);
  }
  componentDidMount() {
    this.setState({
      title: this.props.navigation.state.params.title,
      text: this.props.navigation.state.params.text,
      update: this.props.navigation.state.params.update
    });
  }

  renderButton(title, text, update) {
    const noteCheck = this.props.noteList.map(data => {
      if (
        this.state.title == data.title &&
        this.state.text == data.text &&
        this.state.update
      ) {
        return data;
      }
    });

    if (noteCheck.length > 0 && noteCheck[0] != undefined) {
      return (
        <Button
          onPress={() => {
            this.updateNote(title, text, update);
            this.setState({ title: "", text: "", update: false });
            this.props.navigation.navigate("noteList", {
              title: "",
              text: "",
              update: false
            });
          }}
          title={"Done1"}
        />
      );
    }
    return (
      <Button
        onPress={() => {
          this.addNote(title, text, update);
          this.setState({ title: "", text: "", update: false });
          this.props.navigation.navigate("noteList");
        }}
        title={"Done2"}
      />
    );
  }

  render() {
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
          {this.renderButton(
            this.state.title,
            this.state.text,
            this.state.update
          )}

          <Button
            onPress={() => {
              this.setState({ title: "", text: "", update: false });
              this.props.navigation.goBack();
              
            }}
            title={"Back"}
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