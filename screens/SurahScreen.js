// screens/SurahScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  ImageBackground,
  Touchable,
} from "react-native";
import axios from "axios";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
// Importing separated components
import Header from "../components/Header";
import TimerModal from "../components/TimerModal";
import ReciterModal from "../components/ReciterModal";
import SurahPicker from "../components/SurahPicker";
import AudioPlayer from "../components/AudioPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backgroundImages = {
  msjbg: require("../assets/msjbg.png"),
  pbg: require("../assets/pbg.png"),
  MoonBG: require("../assets/MoonBG.png"),
  background: require("../assets/background.png"),
  background1: require("../assets/background (1).png"),
  background2: require("../assets/background (2).png"),
  background4: require("../assets/background (4).png"),
  background5: require("../assets/background (5).png"),
  background6: require("../assets/background (6).png"),
  background7: require("../assets/background (7).png"),
  background8: require("../assets/background (8).png"),
  background9: require("../assets/background (9).png"),
  background10: require("../assets/background (10).png"),
  background11: require("../assets/background (11).png"),
};

const SurahScreen = ({ route, navigation }) => {
  // Audio and Playback States
  const [audioUrl, setAudioUrl] = useState(null);
  const [sound, setSound] = useState(null);
  const soundRef = useRef(null); // Reference to the sound object
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(null);


  // Surah and Reciter States
  const [selectedSurah, setSelectedSurah] = useState(
    route.params?.surahNumber || 1
  );
  const [chapters, setChapters] = useState([]);
  const [selectedReciterId, setSelectedReciterId] = useState(13); // Default to Mishari Rashid Alafasy

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
    { id: 1, name: "Abdul Basit Abdus Samad (Mujawwad)" },
    { id: 2, name: "Abdul Basit Abdus Samad (Murattal)" },
    { id: 3, name: "Abdul Rahman Al-Sudais" },
    { id: 4, name: "Saud Al-Shuraim" },
    { id: 6, name: "Mahmoud Khalil Al-Husary" },
    { id: 7, name: "Mishary Rashid Alafasy" },
    { id: 9, name: "Muhammad Siddiq Al-Minshawi" },
    { id: 13, name: "Saad Al-Ghamdi" },
    { id: 17, name: "Sahl Yasin" },
    { id: 18, name: "Salah Bukhatir" },
    { id: 19, name: "Ahmed Al-Ajmi" },
    { id: 22, name: "Muhammad Ayyub" },
    { id: 23, name: "Tawfeeq As-Sawaigh" },
    { id: 32, name: "Muhammad Jibreel" },
    { id: 40, name: "Abdul Wadood Haneef" }
];




  // Timer Options in milliseconds
  const timerOptions = [
    // 1 min
    { label: "1 Minute", value: 60000 },
    { label: "30 Minutes", value: 30 * 60000 },
    { label: "1 Hour", value: 60 * 60000 },
    { label: "3 Hours", value: 180 * 60000 },
    { label: "5 Hours", value: 300 * 60000 },
    { label: "7 Hours", value: 420 * 60000 },
    { label: "9 Hours", value: 540 * 60000 },
    { label: "10 Hours", value: 600 * 60000 },
  ];

  // Update timerRunningRef whenever timerRunning changes
  useEffect(() => {
    timerRunningRef.current = timerRunning;
  }, [timerRunning]);


  // Load preferences from AsyncStorage on component mount

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedSurah = await AsyncStorage.getItem("selectedSurah");
        const savedReciter = await AsyncStorage.getItem("selectedReciterId");
        const savedBackground = await AsyncStorage.getItem("selectedBackground");

        if (savedSurah) handleSurahChange(JSON.parse(savedSurah));
        if (savedReciter) handleSelectReciter(JSON.parse(savedReciter));
        
        // Load background image from storage or route params
        const newBgPath = route.params?.selectedBackground || savedBackground;
        if (newBgPath) {
          setBackgroundImage(newBgPath);
          // Save new background from route params if it exists
          if (route.params?.selectedBackground) {
            await AsyncStorage.setItem("selectedBackground", route.params.selectedBackground);
          }
        }
      } catch (error) {
        console.log("Error loading preferences:", error);
      }
    };

    loadPreferences();
  }, [route.params?.selectedBackground]);

  

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

    const handleSurahChange = async (newSurah) => {
    setSelectedSurah(newSurah);
    await AsyncStorage.setItem("selectedSurah", JSON.stringify(newSurah));
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
      handleSurahChange(nextSurah);
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

  
  const handlePreviousSurah = () => {
    const currentSurah = parseInt(selectedSurah);
    if (isNaN(currentSurah)) {
      return;
    }
  
    const previousSurah = currentSurah - 1;
  
    if (previousSurah >= 1) {
      handleSurahChange(previousSurah);
    } else {
      // No more surahs to go back to
      stopAudio();
    }
  };
  
  // Function to format time in mm:ss
// Corrected Function to format time in hh:mm:ss
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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

  const resetTimer = () => {
    setTimerDuration(0); // Reset the duration
    setRemainingTime(0); // Reset remaining time
    setTimerRunning(false); // Stop the timer if it's running
  };

  // Function to handle Reciter selection
  const handleSelectReciter = async (reciterId) => {
    setSelectedReciterId(reciterId);
    await AsyncStorage.setItem("selectedReciterId", JSON.stringify(reciterId));
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
    <ImageBackground source={backgroundImage ? backgroundImages[backgroundImage] : backgroundImages.msjbg} style={styles.background}>

    <LinearGradient
    colors={["rgba(6, 36, 72, 0.1)", "rgba(6, 36, 72, 0.9)"]}
    style={styles.gradient}
  />

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
        onResetTimer={resetTimer}
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
          onSelectSurah={handleSurahChange}
        />

        {/* Audio Player */}
        {audioUrl && !isLoading && (
          <AudioPlayer
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSetTimer={() => setTimerModalVisible(true)}
          onSkipNext={handleNextSurah}  // Function to skip to the next surah
          onSkipPrevious={handlePreviousSurah} // Define this function similarly to skip back
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
    fontFamily: "sans-serif ",
    backgroundColor: "#18293D",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent overlay
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    height: "25%", // Adjust this value to control the gradient height
    width: "100%",
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 20, // Retained to prevent overlapping with header
    justifyContent: "flex-end", // Align content to the bottom
  },

  timerText: {
    fontSize: 46,
    marginTop: 100,
    textAlign: "center",
    fontFamily: "bold",
    color: "#fff",
  },
});

export default SurahScreen;
