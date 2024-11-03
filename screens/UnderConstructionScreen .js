import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UnderConstructionScreen = () => {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <Ionicons name="construct-outline" size={100} color="#F5A623" style={styles.icon} />

      {/* Main Message */}
      <Text style={styles.title}>We're Working on It!</Text>
      
      {/* Subtext */}
      <Text style={styles.subtitle}>
        This screen is currently under construction. Check back soon!
      </Text>

      {/* Decorative Image (Optional) */}
      <Image
        source={{ uri: 'https://path-to-your-image.png' }} // Replace with an image URL or local asset
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18293D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5A623',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#CDD1DC',
    textAlign: 'center',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    opacity: 0.6,
    marginTop: 20,
  },
});

export default UnderConstructionScreen;
