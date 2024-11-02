// components/TimerModal.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

const TimerModal = ({
  visible,
  onClose,
  onSetTimer,
  onResetTimer,
  timerOptions,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Timer Duration</Text>
          {timerOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.modalOption}
              onPress={() => onSetTimer(option.value)}
            >
              <Text style={styles.modalOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.buttonContainer}>
            {/* Cancel Button */}
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Reset Timer Button */}
            <TouchableOpacity style={styles.Resetbutton} onPress={onResetTimer}>
              <Text style={styles.buttonText}>Reset Timer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#000000",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "UnicaOne_400Regular",
    color: "#fff",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: "UnicaOne_400Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "rgba(26, 115, 232, 0.5)",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  Resetbutton: {
    flex: 1,
    backgroundColor: "#1a73e8",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "UnicaOne_400Regular",
  },
});

export default TimerModal;
