// components/SurahPicker.js
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

const SurahPicker = ({
  chapters,
  selectedSurah,
  onSelectSurah,
}) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => {
        if (value) {
          onSelectSurah(value);
        }
      }}
      items={chapters.map((chapter) => ({
        label: chapter.name_simple,
        value: chapter.id,
      }))}
      value={selectedSurah}
      placeholder={{ label: "Select a Surah", value: null }}
      style={{
        inputIOS: styles.selectedSurahPicker,
        inputAndroid: styles.selectedSurahPicker,
        iconContainer: {
          top: 10,
          right: 12,
        },
      }}

      useNativeAndroidPickerStyle={false} // Optional: Use custom styles on Android
    />
  );
};

const styles = StyleSheet.create({
  selectedSurahPicker: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 40,
    textAlign: "center",
    color: "#fff",
    paddingRight: 30, // To ensure the text is never behind the icon
    fontFamily: "UnicaOne_400Regular",
  },
});

export default SurahPicker;
