// screens/SettingsScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={26} color="#ffffff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Settings</Text>

      {/* Options */}
      <View style={styles.contentContainer}>

        <OptionItem
          icon="priority-high"
          title="About"
          onPress={() => navigation.navigate("About")}
        />
        <OptionItem
          icon="format-paint"
          title="Change Background"
          onPress={() => navigation.navigate("BackgroundChange")}
        />
        <OptionItem
          icon="question-mark"
          title="How to use Rahat Al-Rooh"
          onPress={() => navigation.navigate("Image")}
        />
      </View>
    </View>
  );
};

const OptionItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <MaterialIcons name={icon} size={24} color="#fff" />
    <Text style={styles.optionText}>{title}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    fontFamily: "UnicaOne_400Regular",
  },
  backButton: {
    position: "absolute",
    top: 103,
    left: 30,
    zIndex: 1, // Ensures the back button is above other elements
  },
  title: {
    fontSize: 30,
    color: "#ffffff",
    marginTop: 100, // Adjusted to add space below the back button
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "UnicaOne_400Regular",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#333333",
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 24,
    color: "#ffffff",
    marginLeft: 10,
    fontFamily: "UnicaOne_400Regular",
  },
});

export default SettingsScreen;
