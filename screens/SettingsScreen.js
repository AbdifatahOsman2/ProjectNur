// screens/SettingsScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BackgroundChange")}
      >
        <Text style={styles.buttonText}>Change Background</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1a73e8",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default SettingsScreen;
