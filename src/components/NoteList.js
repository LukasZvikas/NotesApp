import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNotes } from "../actions";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient, Font } from "expo";
import { Button, Card } from "react-native-elements";
import Note from "./Note";

class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = { notes: this.props.noteList, fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "open-sans-semibold": require("../../assets/Open_Sans/OpenSans-SemiBold.ttf"),
      "open-sans-regular": require("../../assets/Open_Sans/OpenSans-Regular.ttf")
    });

    this.setState({ fontLoaded: true });
    console.log(this.state);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Your Notes",
      headerStyle: {
        backgroundColor: "#f7f7f7",
        borderColor: "black",
        shadowOffset: { height: 0.1 },
        shadowColor: "black",
        shadowOpacity: 0.5
      },
      headerTitleStyle: {
        color: "#000",
        fontSize: 25,
        fontFamily: "open-sans-regular"
      },
      headerRight: (
        <Button
          backgroundColor="#f7f7f7"
          color="rgba(0, 122, 255, 1)"
          fontSize="20"
          onPress={() => {
            navigation.navigate("newNote", {
              title: "",
              text: "",
              update: false
            });
          }}
          title={"New"}
        />
      )
    };
  };

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
      if (this.state.fontLoaded) {
        return (
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.details}>
              <Text
                style={styles.noteBoxTitle}
                onPress={() => {
                  this.props.navigation.navigate("newNote", {
                    title: note.title,
                    text: note.text,
                    id: note.id,
                    update: true
                  });
                }}
              >
                {note.title}
              </Text>
              <Text style={styles.noteBoxText}>{note.text}</Text>
            </View>
          </Card>
        );
      }
      return null;
    });
  }

  render() {
    return (
      <LinearGradient
        colors={["#66a6ff", "#89f7fe"]}
        style={styles.linearGradient}
      >
        <View>{this.renderNotes(this.props.noteList)}</View>
      </LinearGradient>
    );
  }
}

function mapStateToProps(state) {
  return {
    noteList: state.notes
  };
}

const styles = {
  details: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  cardStyle: {
    shadowOffset: { height: 0.5 },
    shadowColor: "black",
    shadowOpacity: 1
  },
  linearGradient: {
    flex: 1
  },
  noteBoxTitle: {
    fontSize: 20,
    fontFamily: "open-sans-semibold"
  },
  noteBoxText: {
    fontSize: 15,
    fontFamily: "open-sans-regular"
  }
};
export default connect(mapStateToProps, { fetchNotes })(NoteList);
