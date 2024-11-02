// components/AudioPlayer.js
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";

const AudioPlayer = ({
  isPlaying,
  onPlayPause,
  onSetTimer,
  onSkipNext,
  onSkipPrevious,
}) => {
  return (
    <View style={styles.audioPlayerContainer}>
      <View style={styles.controlsRow}>
        {/* Go Back Button */}
        <TouchableOpacity
          onPress={onSkipPrevious}
          style={[styles.controlButton, styles.skipButton]}
        >
          <AntDesign name="caretleft" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Play/Pause Button */}
        <TouchableOpacity onPress={onPlayPause} style={styles.playPauseButton}>
          <Icon
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={48}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity
          onPress={onSkipNext}
          style={[styles.controlButton, styles.skipButton]}
        >
          <AntDesign name="caretright" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Timer Icon */}
        <TouchableOpacity onPress={onSetTimer} style={styles.timerIcon}>
          <MaterialCommunityIcons name="timer-outline" size={32} style={{ MarginLeft: 40}} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioPlayerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginTop: 16,
    marginBottom: 50,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  controlButton: {
    backgroundColor: "#132741", // Dark blue background for the play/pause button
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 10,
  },
  playPauseButton: {
    backgroundColor: "#132741", // Grey background for skip buttons
    borderRadius: 100,
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 20,
  },
  skipButton: {
    backgroundColor: "#575757", // Grey background for skip buttons
  },
  timerIcon: {
    position: "absolute",
    right: 20,
    alignSelf: "center",
  },
});

export default AudioPlayer;
