// screens/HowtoScreen.js
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For the back button

const HowtoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Full Screen Image */}
      <Image
        source={require('../assets/Rules.png')} // Make sure this path is correct
        style={styles.fullImage}
        resizeMode="contain" // Ensures the image fits without stretching
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18293D", // Black background for better contrast
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1, // Ensure back button appears on top of the image
  },
  fullImage: {
    marginTop: 30,
    width: "100%",
    height: "100%",
  },
});

export default HowtoScreen;
