import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const QuizItem = (props) => {
  const { question, correct_answer } = props.item;

  const [disabled, setDisabled] = useState(false);

  return !disabled ? (
    <View>
      <Text style={styles.questionText}>
        {question.replace(/(&quot\;)/g, '"')}
      </Text>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.scoreCallback(props.index, true);
          setDisabled(true);
        }}
      >
        <Text style={styles.buttonText}>{"true"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.scoreCallback(props.index, false);
          setDisabled(true);
        }}
      >
        <Text style={styles.buttonText}>{"false"}</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  questionText: {
    fontSize: 24,
    padding: 10,
    margin: 20,
  },
});
