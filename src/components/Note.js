import _ from "lodash";
import React, { Component } from "react";
import {
  View,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Button, Card } from "react-native-elements";
import { LinearGradient, Font } from "expo";
import { connect } from "react-redux";
import { createNote, updateNote } from "../actions";
import { styles } from "../styles/noteStyles";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.title,
      text: this.props.navigation.state.params.text,
      update: this.props.navigation.state.params.update,
      id: this.props.navigation.state.params.id,
      fontLoaded: false
    };
  }
  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "New Note",
      headerStyle: {
        backgroundColor: "#fff",
        borderColor: "black",
        shadowOffset: { height: 0.1 },
        shadowColor: "black",
        shadowOpacity: 0.5
      },
      headerBackTitleStyle: { fontWeight: "bold", fontSize: 20 },
      headerTintColor: "#007aff",
      headerTitleStyle: {
        fontSize: 25,
        color: "#000",
        // fontFamily: "SFSemiBold"
      },
      headerRight: (
        <Button
          color="#007aff"
          backgroundColor="#fff"
          fontSize="20"
          fontWeight="bold"
          onPress={() => {
            navigation.state.params.onDone(
              navigation.state.params.id,
              navigation.state.params.update
            );
          }}
          title={"Done"}
        />
      )
    };
  };

  componentDidMount() {
    Font.loadAsync({
      "SFMedium": require("../../assets/SFCompact/SFCompactDisplay-Light.otf"),
      "SFSemiBold": require("../../assets/SFCompact/SFCompactDisplay-Semibold.otf")
    });

    this.props.navigation.setParams({
      noteTitle: this.props.navigation.state.params.title,
      noteText: this.props.navigation.state.params.title,
      onDone: this.onDone.bind(this)
    });
    this.setState({ fontLoaded: true });
  }

  addNote(title, text) {
    return this.props.createNote(title, text);
  }

  updateNote(title, text, id) {
    return this.props.updateNote(title, text, id);
  }

  onDone(id, check) {
    console.log("ID", id, check);
    if (check && this.state.title != "") {
      this.updateNote(
        this.props.navigation.state.params.noteTitle,
        this.props.navigation.state.params.noteText,
        id
      );
      this.props.navigation.goBack();
    } else if (this.state.title == "") {
      Alert.alert("Please enter a title");
    } else {
      this.addNote(
        this.props.navigation.state.params.noteTitle,
        this.props.navigation.state.params.noteText
      );
      this.props.navigation.goBack();
    }
    return true;
  }

  render() {
    const { params } = this.props.navigation.state;
    const noteTitle = params ? params.title : null;
    const noteText = params ? params.text : null;
    const noteCheck = params ? params.update : null;
    const noteId = params ? params.id : null;
    return (
      <View>
        {this.state.fontLoaded ? (
            <Card containerStyle={styles.cardStyle}>
              <View>
                <TextInput
                  style={styles.titleStyle}
                  value={noteTitle}
                  onChangeText={title => {
                    this.setState({ title });
                    this.props.navigation.setParams({ noteTitle: title });
                  }}
                  placeholder="Note Title"
                />
                <TextInput
                  multiline={true}
                  style={styles.textStyle}
                  value={noteText}
                  onChangeText={text => {
                    this.setState({ text });
                    this.props.navigation.setParams({ noteText: text });
                  }}
                  placeholder="Note Description"
                />
                {/*<View style={{ alignItems: "center", marginTop: 20 }}>
                  <Button
                    buttonStyle={styles.button}
                    onPress={() => {
                      this.onDone(noteId, noteCheck);
                    }}
                    title={"Done"}
                  />
                </View>*/}
              </View>
            </Card>
        ) : null}
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
