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
        backgroundColor: "#00FA9A",
        borderColor: "black",
        shadowOffset: { height: 0.1 },
        shadowColor: "black",
        shadowOpacity: 0.5
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff",
        fontSize: 25,
        fontFamily: "open-sans-regular"
      },
      headerRight: (
        <Button
          backgroundColor="#00FA9A"
          
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
        <Card containerStyle={styles.cardStyleIndex}>
          <View >
          <Text style={styles.indexTitle}>No Notes Yet!</Text>
          <Text style={styles.indexText}>Press New To Add a Note</Text>
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
          </Card>
        );
      }
      return null;
    });
  }

  render() {
    return (
        <View>{this.renderNotes(this.props.noteList)}</View>
   
    );
  }
}

function mapStateToProps(state) {
  return {
    noteList: state.notes
  };
}

const styles = {
  indexDetails: {
    justifyContent: 'center',
    alignItems: "center",

  },
  cardStyleIndex: {
    shadowOffset: { height: 0.5 },
    shadowColor: "black",
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: "center",
    margin: 0,
    height: "100%"
  },
  indexTitle: {
    fontSize: 30,
    fontFamily: "open-sans-semibold",
    textAlign: "center"
  },
  indexText: {
    fontSize: 22,
    marginTop: 20,
    fontFamily: "open-sans-regular"
  },

  details: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  cardStyle: {
    margin: 0
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
