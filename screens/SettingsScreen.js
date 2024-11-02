// screens/SettingsScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Settings</Text>
        <OptionItem
          icon="account-circle"
          title="Account"
          onPress={() =>  Alert.alert("In Construction")}
        />
        <OptionItem
          icon="question-mark"
          title="About"
          onPress={() => navigation.navigate("About")}
        />
        <OptionItem
          icon="format-paint"
          title="Change Background"
          onPress={() => navigation.navigate("BackgroundChange")}
        />
        <OptionItem
        icon="notifications"
        title="Notifications"
        onPress={() => Alert.alert("Coming Soon")}
      />
      </ScrollView>
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
    fontFamily: "UnicaOne_400Regular",
    backgroundColor: "black",
  },
  contentContainer: {
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 30,
    color: "#ffffff",
    marginBottom: 24,
    fontFamily: "UnicaOne_400Regular",
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
