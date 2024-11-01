// components/AudioPlayer.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";

const AudioPlayer = ({
  isPlaying,
  onPlayPause,
  onSetTimer,
  position,
  duration,
  onSeek,
  formatTime,
}) => {
  return (
    <View style={styles.audioPlayerContainer}>
      <View style={styles.controlsRow}>
        {/* Play/Pause Button */}
        <TouchableOpacity
          onPress={onPlayPause}
          accessible={true}
          accessibilityLabel={isPlaying ? "Pause Audio" : "Play Audio"}
          style={styles.playPauseButton}
        >
          <Icon
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={64}
            color={isPlaying ? "#ff0000" : "#00ff00"}
          />
        </TouchableOpacity>

        {/* Timer Icon */}
        <TouchableOpacity
          style={styles.timerIcon}
          onPress={onSetTimer}
          accessible={true}
          accessibilityLabel="Set Timer"
        >
          <MaterialCommunityIcons name="timer-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={onSeek}
          disabled={!isPlaying}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1EB1FC"
        />
        <Text style={styles.timeText}>
          {formatTime(position)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioPlayerContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },

  playPauseButton: {
    marginRight: 0, // Increased spacing between play/pause and timer
  },
  timerIcon: {
    padding: 8, // Added padding for better touch target
  },
  sliderContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 8,
  },
});

export default AudioPlayer;
