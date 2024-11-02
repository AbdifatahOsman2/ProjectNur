// screens/SettingsScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Settings</Text>
        <OptionItem
          icon="account-circle"
          title="Account"
          onPress={() => navigation.navigate("AccountSettings")}
        />
        <OptionItem
          icon="notifications"
          title="Notifications"
          onPress={() => navigation.navigate("NotificationSettings")}
        />
        <OptionItem
          icon="lock"
          title="Privacy"
          onPress={() => navigation.navigate("PrivacySettings")}
        />
        <OptionItem
          icon="format-paint"
          title="Change Background"
          onPress={() => navigation.navigate("BackgroundChange")}
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
    backgroundColor: "black",
  },
  contentContainer: {
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#333333",
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 18,
    color: "#ffffff",
    marginLeft: 10,
  },
});

export default SettingsScreen;
