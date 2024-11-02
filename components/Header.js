// components/Header.js
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
const Header = ({ onOpenReciterModal, onPressSettings }) => {
  return (
    <View style={styles.header}>
      {/* Reciter Selection Icon */}
      <TouchableOpacity
        onPress={onOpenReciterModal}
        accessible={true}
        accessibilityLabel="Open Reciter Selection"
        style={{ marginLeft: 6 }}
      >
        <FontAwesome6
          name="user-group"
          size={32}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Settings Icon */}
      <TouchableOpacity
        onPress={onPressSettings}
        accessible={true}
        accessibilityLabel="Open Settings"
        style={{ marginRight: 6 }}
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
});

export default Header;
