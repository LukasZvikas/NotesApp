import _ from "lodash";
import React, { Component } from "react";
import { View, TextInput } from "react-native";
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
        backgroundColor: "#00FA9A",
        borderColor: "black",
        shadowOffset: { height: 0.1 },
        shadowColor: "black",
        shadowOpacity: 0.5
      },
      headerBackTitleStyle: { fontWeight: "bold", fontSize: 20 },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontSize: 25
      }
      // headerRight: (
      //   <Button
      //     backgroundColor="#00FA9A"
      //     fontSize="20"
      //     fontWeight="bold"
      //     onPress={() => {
      //       this.onDone(id, check);
      //       goBack();
      //     }}
      //     title={"Done"}
      //   />
      // )
    };
  };

  componentDidMount() {
    Font.loadAsync({
      "open-sans-semibold": require("../../assets/Open_Sans/OpenSans-SemiBold.ttf"),
      "open-sans-regular": require("../../assets/Open_Sans/OpenSans-Regular.ttf")
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
                }}
                placeholder="Note Title"
              />
              <TextInput
                multiline={true}
                style={styles.textStyle}
                value={noteText}
                onChangeText={text => {
                  this.setState({ text });
                }}
                placeholder="Note Description"
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 20 }}>
               <Button
                buttonStyle={styles.button}
                onPress={() => {
                  this.onDone(noteId, noteCheck);
                  this.props.navigation.goBack();
                }}
                title={"Done"}
              />
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
