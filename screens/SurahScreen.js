// screens/SurahScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import bgImage from "../assets/msjbg.png"; // Import the background image

// Importing separated components
import Header from "../components/Header";
import TimerModal from "../components/TimerModal";
import ReciterModal from "../components/ReciterModal";
import SurahPicker from "../components/SurahPicker";
import AudioPlayer from "../components/AudioPlayer";

const SurahScreen = ({ route, navigation, bgImage }) => {
  // Audio and Playback States
  const [audioUrl, setAudioUrl] = useState(null);
  const [sound, setSound] = useState(null);
  const soundRef = useRef(null); // Reference to the sound object
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Surah and Reciter States
  const [selectedSurah, setSelectedSurah] = useState(
    route.params?.surahNumber || 1
  );
  const [chapters, setChapters] = useState([]);
  const [selectedReciterId, setSelectedReciterId] = useState(2); // Default to Mishari Rashid Alafasy

  // Timer States
  const [timerDuration, setTimerDuration] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRunningRef = useRef(timerRunning); // Reference to timerRunning
  const [remainingTime, setRemainingTime] = useState(0);

  // Modals Visibility States
  const [timerModalVisible, setTimerModalVisible] = useState(false); // Timer Modal
  const [reciterModalVisible, setReciterModalVisible] = useState(false); // Reciter Modal

  // Reference to track the first render to prevent auto-play
  const isFirstRender = useRef(true);

  // Define the list of top reciters
  const reciters = [
    { id: 2, name: "Mishari Rashid Alafasy" },
    { id: 3, name: "Abdul Rahman Al-Sudais" },
    { id: 4, name: "Saud Al-Shuraim" },
    { id: 7, name: "mishari_al_afasy" },
    { id: 6, name: "Mahmoud Khalil Al-Hussary" },
    { id: 13, name: "Saad Al-Ghamdi" },
    { id: 19, name: "Ahmed Al-Ajmi" },
    { id: 18, name: "Salah Bukhatir" },
    { id: 9, name: "Maher Al-Muaiqly" },
    { id: 20, name: "sodais_and_shuraim" },
    { id: 22, name: "muhammad_ayyoob" },
    { id: 40, name: "abdulwadood_haneef" },
    { id: 32, name: "test" },
  ];

  // Timer Options in milliseconds
  const timerOptions = [
    { label: "1 Minute", value: 60 * 1000 },
    { label: "30 Minutes", value: 30 * 60000 },
    { label: "1 Hour", value: 60 * 60000 },
    { label: "3 Hours", value: 180 * 60000 },
    { label: "5 Hours", value: 300 * 60000 },
  ];

  // Update timerRunningRef whenever timerRunning changes
  useEffect(() => {
    timerRunningRef.current = timerRunning;
  }, [timerRunning]);

  // Fetch chapters on component mount
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          "https://api.quran.com/api/v4/chapters"
        );
        setChapters(response.data.chapters);
      } catch (error) {
        console.log("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  // Setup audio mode on component mount
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log("Error setting audio mode:", error);
      }
    };

    setupAudio();
  }, []);

  // Fetch audio whenever selectedSurah or selectedReciterId changes
  useEffect(() => {
    fetchSurahAudio(selectedSurah, selectedReciterId);
  }, [selectedSurah, selectedReciterId]);

  // Handle audioUrl changes to play audio, skipping first render
  useEffect(() => {
    if (audioUrl) {
      if (isFirstRender.current) {
        isFirstRender.current = false; // Skip the first render
      } else if (isPlaying) {
        playAudio();
      }
    }
  }, [audioUrl]);

  // Timer Effect
  useEffect(() => {
    let timerInterval;
    if (timerRunning && timerDuration > 0) {
      setRemainingTime(timerDuration); // Initialize remaining time
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1000) {
            // Time is up
            clearInterval(timerInterval);
            stopAudio();
            setTimerRunning(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerRunning, timerDuration]);

  // Function to fetch Surah audio based on Surah number and Reciter ID
  const fetchSurahAudio = async (
    surahNumber,
    reciterId = selectedReciterId
  ) => {
    if (!surahNumber || isNaN(surahNumber)) {
      return;
    }

    setIsLoading(true);
    try {
      // Unload previous sound if it exists
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
        }
        setIsPlaying(false);
        setSound(null);
        soundRef.current = null;
      }

      // Fetch the audio URL with the selected reciter ID
      const response = await axios.get(
        `https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahNumber}`
      );
      setAudioUrl(response.data.audio_file.audio_url);
    } catch (error) {
      console.log(
        `Error fetching surah audio for surah ${surahNumber}:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to play audio
  const playAudio = async () => {
    if (audioUrl) {
      try {
        // Unload previous sound if it's still loaded
        if (soundRef.current) {
          const status = await soundRef.current.getStatusAsync();
          if (status.isLoaded) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
          }
          setSound(null);
          setIsPlaying(false);
          soundRef.current = null;
        }

        // Load and play the new sound
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        soundRef.current = newSound;
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
          }
          if (status.didJustFinish) {
            await newSound.unloadAsync();
            soundRef.current = null;

            // Proceed to the next surah if timer is still running
            if (timerRunningRef.current) {
              handleNextSurah();
            } else {
              setIsPlaying(false); // Only stop playing if the timer has ended
            }
          }
        });
      } catch (error) {
        console.log("Error playing audio:", error);
      }
    }
  };

  // Function to handle next Surah
  const handleNextSurah = async () => {
    const currentSurah = parseInt(selectedSurah);
    if (isNaN(currentSurah)) {
      return;
    }

    const nextSurah = currentSurah + 1;

    if (nextSurah <= chapters.length) {
      setSelectedSurah(nextSurah);
    } else {
      // No more surahs to play
      stopAudio();
      setTimerRunning(false);
    }
  };

  // Function to pause audio
  const pauseAudio = async () => {
    if (soundRef.current) {
      try {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        }
      } catch (error) {
        console.log("Error pausing audio:", error);
      }
    }
  };

  // Function to stop audio
  const stopAudio = async () => {
    if (soundRef.current) {
      try {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
        }
        setIsPlaying(false);
        setSound(null);
        soundRef.current = null;
      } catch (error) {
        console.log("Error stopping audio:", error);
      }
    }
  };

  // Function to seek audio
  const seekAudio = async (value) => {
    if (soundRef.current) {
      try {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          await soundRef.current.setPositionAsync(value);
          setPosition(value);
        }
      } catch (error) {
        console.log("Error seeking audio:", error);
      }
    }
  };

  // Function to format time in mm:ss
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Function to set the timer based on selected duration
  const handleSetTimer = (duration) => {
    if (duration > 0) {
      setTimerDuration(duration);
      setTimerRunning(true);
      setTimerModalVisible(false); // Close the timer modal
    } else {
      alert("Please select a valid timer duration.");
    }
  };

  // Function to handle Reciter selection
  const handleSelectReciter = (reciterId) => {
    setSelectedReciterId(reciterId);
    setReciterModalVisible(false);
    fetchSurahAudio(selectedSurah, reciterId);
  };

  // Function to handle Play/Pause
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Function to handle Settings button press
  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
    <View style={styles.overlay}>
      {/* Header with Reciter and Settings Icons */}
      <Header
        onOpenReciterModal={() => setReciterModalVisible(true)}
        onPressSettings={handleSettingsPress}
      />

      {/* Remaining Time Display */}
      {timerRunning && (
        <Text style={styles.timerText}>
          Time left: {formatTime(remainingTime)}
        </Text>
      )}

      {/* Timer Modal */}
      <TimerModal
        visible={timerModalVisible}
        onClose={() => setTimerModalVisible(false)}
        onSetTimer={handleSetTimer}
        timerOptions={timerOptions}
      />

      {/* Reciter Selection Modal */}
      <ReciterModal
        visible={reciterModalVisible}
        onClose={() => setReciterModalVisible(false)}
        reciters={reciters}
        onSelectReciter={handleSelectReciter}
      />

      {/* Main Content */}
      <View style={styles.content}>

        {/* Selected Surah Picker */}
        <SurahPicker
          chapters={chapters}
          selectedSurah={selectedSurah}
          onSelectSurah={setSelectedSurah}
        />

        {/* Audio Player */}
        {audioUrl && !isLoading && (
          <AudioPlayer
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onSetTimer={() => setTimerModalVisible(true)} // Trigger Timer Modal
            position={position}
            duration={duration}
            onSeek={seekAudio}
            formatTime={formatTime}
          />
        )}

        {/* Loading Indicator */}
        {isLoading && <ActivityIndicator size="large" color="#ffffff" />}
      </View>
    </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    fontFamily: "sans-serif ",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent overlay
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 20, // Retained to prevent overlapping with header
    justifyContent: "flex-end", // Align content to the bottom
  },

  timerText: {
    fontSize: 26,
    textAlign: "center",
    color: "#fff",
  },
});

export default SurahScreen;
