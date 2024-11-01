// components/Header.js
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({ onOpenReciterModal, onPressSettings }) => {
  return (
    <View style={styles.header}>
      {/* Reciter Selection Icon */}
      <TouchableOpacity
        onPress={onOpenReciterModal}
        accessible={true}
        accessibilityLabel="Open Reciter Selection"
      >
        <MaterialCommunityIcons
          name="account-settings"
          size={32}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Settings Icon */}
      <TouchableOpacity
        onPress={onPressSettings}
        accessible={true}
        accessibilityLabel="Open Settings"
      >
        <MaterialCommunityIcons name="cog-outline" size={32} color="#fff" />
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
