// components/ReciterModal.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";

const ReciterModal = ({
  visible,
  onClose,
  reciters,
  onSelectReciter,
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
          <Text style={styles.modalTitle}>Select a Reciter</Text>
          {reciters.map((reciter) => (
            <TouchableOpacity
              key={reciter.id}
              style={styles.modalOption}
              onPress={() => onSelectReciter(reciter.id)}
            >
              <Text style={styles.modalOptionText}>{reciter.name}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#000000",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // For Android shadow
  },
  modalTitle: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "UnicaOne_400Regular",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  modalOptionText: {
    fontSize: 22,
    textAlign: "center",
    color: "#fff",
    fontFamily: "UnicaOne_400Regular",
  },
});

export default ReciterModal;
