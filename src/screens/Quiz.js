import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { QuizItem } from "../components/QuizItem";
import { TouchableOpacity } from "react-native-gesture-handler";

function Quiz({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numAnswered, setNumAnswered] = useState(0);

  const stringToBool = (string) => {
    switch (string.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case null:
        return false;
      default:
        return Boolean(string);
    }
  };

  const correctAnswersCallback = (index, isCorrect) => {
    console.log("is correct!! " + index + " true? " + isCorrect);
    console.log("check arr: " + questions[index].correct_answer);
    let isPoint = stringToBool(questions[index].correct_answer) === isCorrect;
    console.log("Point = " + isPoint);
    console.log("Number correct so far:" + numCorrect);
    setNumAnswered(numAnswered + 1);
    if (isPoint) {
      setNumCorrect(numCorrect + 1);
    }

    console.log("Number correct so far:" + numCorrect);
  };
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=boolean")
      .then((list) => {
        return list.json();
      })
      .then((res) => {
        setQuestions(res.results);
        console.log(JSON.stringify(res.results));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      {numAnswered === 10 ? (
        <View style={styles.tryAgain}>
          <Text style={styles.text}>Your score:</Text>
          <Text style={styles.text}>
            {(numCorrect / numAnswered) * 100 + " Percent !"}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Try Again?</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <QuizItem
            item={item}
            index={index}
            scoreCallback={correctAnswersCallback}
          />
        )}
      />
    </View>
  );
}

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
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  tryAgain: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
});

export default Quiz;
