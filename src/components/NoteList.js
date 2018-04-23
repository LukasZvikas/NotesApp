import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNotes, removeNote } from "../actions";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient, Font } from "expo";
import { Button, Card, Icon } from "react-native-elements";
import Note from "./Note";
import { styles } from "../styles/noteListStyles";

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
  }

  this;

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Notes",
      headerStyle: {
        backgroundColor: "#00FA9A",
        borderColor: "black",
        shadowOffset: { height: 0.1 },
        shadowColor: "black",
        shadowOpacity: 0.5
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
        fontSize: 25,
        fontFamily: "open-sans-regular"
      },
      headerRight: (
        <Button
          backgroundColor="#00FA9A"
          fontSize="20"
          fontWeight="bold"
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
        <Card containerStyle={styles.cardStyleIndex}>
          <View>
            <Text style={styles.indexTitle}>No Notes Yet!</Text>
            {/*<Text style={styles.indexText}>Press New To Add a Note</Text>*/}
          </View>
        </Card>
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
            <View style={styles.iconStyle}>
              <Icon
                name="trash"
                type="entypo"
                color="#ff004c"
                size={35}
                onPress={() => {
                  Alert.alert(
                    "Delete Note",
                    "Are your sure you want to delete this note?",
                    [
                      {
                        text: "Yes",
                        onPress: () => this.props.removeNote(note.id)
                      },
                      { text: "No" }
                    ]
                  );
                }}
              />
            </View>
          </Card>
        );
      }
      return null;
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View>{this.renderNotes(this.props.noteList)}</View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    noteList: state.notes
  };
}

export default connect(mapStateToProps, { fetchNotes, removeNote })(NoteList);
