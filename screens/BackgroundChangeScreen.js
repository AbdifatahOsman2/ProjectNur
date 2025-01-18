// screens/BackgroundChangeScreen.js
import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  FlatList,
  Alert 
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Array of background images with paths for AsyncStorage
const backgrounds = [
  { id: 1, src: require("../assets/msjbg.png"), path: "msjbg" },
  { id: 2, src: require("../assets/pbg.png"), path: "pbg" },
  { id: 3, src: require("../assets/MoonBG.png"), path: "MoonBG" },
  { id: 6, src: require("../assets/background.png"), path: "background" },
  { id: 4, src: require("../assets/background (1).png"), path: "background1" },
  { id: 5, src: require("../assets/background (2).png"), path: "background2" },
  { id: 7, src: require("../assets/background (4).png"), path: "background4" },
  { id: 8, src: require("../assets/background (5).png"), path: "background5" },
  { id: 9, src: require("../assets/background (6).png"), path: "background6" },
  { id: 10, src: require("../assets/background (7).png"), path: "background7" },
  { id: 11, src: require("../assets/background (8).png"), path: "background8" },
  { id: 12, src: require("../assets/background (9).png"), path: "background9" },
  { id: 13, src: require("../assets/background (10).png"), path: "background10" },
  { id: 14, src: require("../assets/background (11).png"), path: "background11" },
];

const BackgroundChangeScreen = ({ navigation }) => {
  const [selectedBackground, setSelectedBackground] = useState(null);

  
  // Load the currently selected background on mount
  useEffect(() => {
    loadCurrentBackground();
  }, []);

  const loadCurrentBackground = async () => {
    try {
      const savedBackground = await AsyncStorage.getItem("selectedBackground");
      if (savedBackground) {
        setSelectedBackground(savedBackground);
      }
    } catch (error) {
      console.log("Error loading background:", error);
    }
  };

  const handleBgSelect = async (bg) => {
    try {
      // Save the background path to AsyncStorage
      await AsyncStorage.setItem("selectedBackground", bg.path);
      
      // Navigate back to SurahScreen with the selected background info
      navigation.navigate("Surah", {
        selectedBackground: bg.path,
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to save background preference",
        [{ text: "OK" }]
      );
      console.log("Error saving background:", error);
    }
  };

  const renderBackgroundItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => handleBgSelect(item)}
      style={styles.backgroundContainer}
    >
      <Image source={item.src} style={styles.backgroundImage} />
      {selectedBackground === item.path && (
        <View style={styles.selectedOverlay}>
          <MaterialIcons name="check-circle" size={30} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back-ios" size={26} color="#ffffff" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Select Background</Text>
      
      <FlatList
        data={backgrounds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBackgroundItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
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
    fontSize: 30,
    color: "#ffffff",
    marginTop: 80,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "UnicaOne_400Regular",
  },
  listContainer: {
    paddingBottom: 20,
  },
  backgroundContainer: {
    position: 'relative',
    margin: 5,
  },
  backgroundImage: {
    width: 180,
    height: 250,
    borderRadius: 8,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: "absolute",
    top: 95,
    left: 30,
    zIndex: 1,
  },
});

export default BackgroundChangeScreen;