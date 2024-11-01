// screens/BackgroundChangeScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";

// Array of background images
const backgrounds = [
  { id: 1, src: require("../assets/msjbg.png") },
  { id: 2, src: require("../assets/pbg.png") },
  { id: 3, src: require("../assets/MoonBG.png") },
];
const BackgroundChangeScreen = ({ navigation, setBgImage }) => {
    const handleBgSelect = (bg) => {
      setBgImage(bg.src); // Directly use setBgImage from props
      navigation.goBack();
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Background</Text>
        <FlatList
          data={backgrounds}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBgSelect(item)}>
              <Image source={item.src} style={styles.backgroundImage} />
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      padding: 10,
    },
    title: {
      fontSize: 24,
      color: "#ffffff",
      marginTop: 80,
      marginBottom: 20,
      textAlign: "center",
    },
    backgroundImage: {
      width: 180,
      height: 250,
      margin: 5,
      borderRadius: 8,
    },
  });
  
  export default BackgroundChangeScreen;