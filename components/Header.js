// components/Header.js 
import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

// Import the new Imam icon
import ImamIcon from "../assets/Imam1.png";

const Header = ({ onOpenReciterModal, onPressSettings }) => {
  return (
    <View style={styles.header}>
      {/* Reciter Selection Icon */}
      <TouchableOpacity
        onPress={onOpenReciterModal}
        accessible={true}
        accessibilityLabel="Open Reciter Selection"
        style={styles.iconWrapper}

      >
        <Image source={ImamIcon} style={styles.icon} />
      </TouchableOpacity>

      {/* Settings Icon */}
      <TouchableOpacity
        onPress={onPressSettings}
        accessible={true}
        accessibilityLabel="Open Settings"
        style={styles.iconWrapper}
      >
        <FontAwesome6 name="gear" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 60,
  },
  iconWrapper: {
    marginHorizontal: 6,
    
  },
  icon: {
    width: 45, // Adjust the width as needed
    height: 42, // Adjust the height as needed
    resizeMode: "contain",
    marginTop: -2,
  },
});

export default Header;
