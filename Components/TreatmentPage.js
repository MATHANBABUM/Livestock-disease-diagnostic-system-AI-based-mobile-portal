import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

// Example data passed via route.params
const vetDetails = [
  {
    name: { en: "Dr. John Doe", ta: "டாக்டர் ஜான் டோ" },
    contact: "+91 1234567890",
    address: {
      en: "123 Street, City, Tamil Nadu",
      ta: "123 தெரு, நகரம், தமிழ்நாடு",
    },
  },
  {
    name: { en: "Dr. Priya Sharma", ta: "டாக்டர் பிரியா சர்மா" },
    contact: "+91 9876543210",
    address: {
      en: "456 Avenue, City, Tamil Nadu",
      ta: "456 அவென்யூ, நகரம், தமிழ்நாடு",
    },
  },
];

const TreatmentPage = ({ route, navigation, language }) => {
  const { treatment, diseaseTitle, description } = route.params;

  const translations = {
    en: {
      treatmentFor: "Treatment for ",
      vetDetailsTitle: "Veterinary Doctor Details:",
      noVetDetails: "No veterinary doctor details available.",
      backToDiseases: "Back to Diseases",
      contact: "Contact:",
      address: "Address:",
    },
    ta: {
      treatmentFor: "சிகிச்சை -",
      vetDetailsTitle: "வைத்தியர் விவரங்கள்:",
      noVetDetails: "வைத்தியர் விவரங்கள் கிடைக்கவில்லை.",
      backToDiseases: "திரும்பிச் செல்லவும்",
      contact: "தொடர்பு:",
      address: "முகவரி:",
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {translations[language].treatmentFor} {diseaseTitle}
      </Text>
      <Text style={styles.descriptionText}>{description}</Text>
      <Text style={styles.treatmentText}>{treatment}</Text>
      <Text style={styles.vetTitle}>
        {translations[language].vetDetailsTitle}
      </Text>
      {vetDetails && vetDetails.length > 0 ? (
        vetDetails.map((vet, index) => (
          <View key={index} style={styles.vetContainer}>
            <Text style={styles.vetName}>
              {vet.name[language]} {/* Display name in the selected language */}
            </Text>
            <Text style={styles.vetContact}>
              {translations[language].contact} {vet.contact}
            </Text>
            <Text style={styles.vetAddress}>
              {translations[language].address} {vet.address[language]}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noVetDetails}>
          {translations[language].noVetDetails}
        </Text>
      )}
      <Button
        title={translations[language].backToDiseases}
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  treatmentText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#007bff",
  },
  vetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  vetContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    width: "100%",
  },
  vetName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  vetContact: {
    fontSize: 16,
    marginBottom: 5,
  },
  vetAddress: {
    fontSize: 16,
  },
  noVetDetails: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
    marginBottom: 20,
  },
});

export default TreatmentPage;
