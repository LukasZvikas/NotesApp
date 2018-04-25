import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNotes, removeNote } from "../actions";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient, Font } from "expo";
import { Button, Card, Icon } from "react-native-elements";
import Note from "./Note";
import Swipeout from "react-native-swipeout";
import { styles } from "../styles/noteListStyles";

class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = { notes: this.props.noteList, fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      SFMedium: require("../../assets/SFCompact/SFCompactDisplay-Light.otf"),
      SFSemiBold: require("../../assets/SFCompact/SFCompactDisplay-Semibold.otf")
    });

    this.setState({ fontLoaded: true });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Notes",
      headerStyle: {
        backgroundColor: "#fff",
        borderColor: "black",
        shadowOffset: { height: 0.1 },
        shadowColor: "black",
        shadowOpacity: 0.5
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#000",
        fontSize: 25,
        fontFamily: "SFSemiBold"
      },
      headerRight: (
        <Icon
          backgroundColor="#00FA9A"
          name="add-to-list"
          type="entypo"
          color="#007aff"
          size={32}
          onPress={() => {
            navigation.navigate("newNote", {
              title: "",
              text: "",
              update: false
            });
          }}
        />
        // <Icon
        //   name="add-to-list"
        //   type="entypo"
        //   color="#fff"

        // />
        // </Button>
      )
    };
  };

  renderNotes(noteList) {
    if (noteList.length == 0) {
      return (
        <Card containerStyle={styles.cardStyleIndex}>
          <View>
            <Text style={styles.indexTitle}>Welcome to NotesApp!</Text>
            <Text style={styles.indexText}>
              To add a note, tap the plus button. Tap on the note's title to
              edit a note. To delete a note, swipe left and click on the trash
              icon.
            </Text>
          </View>
        </Card>
      );
    }

    return noteList.map(note => {
      const swipeoutButton = [
        {
          text: "Delete",
          backgroundColor: "#ff004c",
          style: { width: 100 },
          component: (
            <View style={styles.iconStyle}>
              <Icon name="trash" type="entypo" color="#fff" size={35} />
            </View>
          ),
          onPress: () => {
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
          }
        }
      ];

      if (this.state.fontLoaded) {
        return (
          <Swipeout right={swipeoutButton}>
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
          </Swipeout>
        );
      }
      return null;
    });
  }

  render() {
    console.log(this.props.noteList);
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
