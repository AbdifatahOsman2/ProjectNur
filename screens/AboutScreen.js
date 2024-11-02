// screens/AboutScreen.js
import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons for back icon

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        {/* About Text */}
        <Text style={styles.title}> راحة الروح </Text>
        <Text style={styles.paragraph}>
          "Rahat Al-Rooh" is a thoughtfully designed app that brings tranquility to your nights. 
          Allowing the serene recitations of the Quran to soothe your soul and ease you into restful sleep.
          Designed to create a peaceful environment, this app lets you fall asleep listening to 
          carefully selected verses, helping you find comfort, relaxation, and spiritual solace.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#18293d",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for readability
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 28,
    fontFamily: "UnicaOne_400Regular",
    letterSpacing: 0.7,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default AboutScreen;
