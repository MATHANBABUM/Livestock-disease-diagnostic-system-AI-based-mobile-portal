import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const DiseasePrevention = ({ language }) => {
  const translations = {
    en: {
      diseasePrevention: "Disease Prevention",
      title: "Disease Prevention Tips",
      categories: [
        {
          category: "Hygiene and Sanitation",
          tips: [
            "Clean animal shelters regularly.",
            "Disinfect feeding and watering equipment.",
            "Ensure proper waste disposal.",
          ],
        },
        {
          category: "Vaccination and Health",
          tips: [
            "Ensure regular vaccinations for all animals.",
            "Schedule routine health check-ups with a veterinarian.",
            "Monitor animals for early signs of illness.",
          ],
        },
        {
          category: "Nutrition and Feeding",
          tips: [
            "Provide a balanced diet with essential nutrients.",
            "Ensure access to clean and fresh water.",
            "Avoid feeding spoiled or contaminated food.",
          ],
        },
        {
          category: "Disease Control",
          tips: [
            "Isolate sick animals to prevent the spread of disease.",
            "Control pests and parasites in the environment.",
            "Implement biosecurity measures to prevent disease entry.",
          ],
        },
      ],
    },
    ta: {
      diseasePrevention: "நோய் தடுப்பு",
      title: "நோய் தடுப்பு குறிப்புகள்",
      categories: [
        {
          category: "தூய்மை மற்றும் சுகாதாரம்",
          tips: [
            "விலங்கு தங்குமிடங்களை அடிக்கடி சுத்தம் செய்யவும்.",
            "உணவு மற்றும் தண்ணீர் வழங்கும் உபகரணங்களை கிருமி நீக்கவும்.",
            "சரியான கழிவுகளை அகற்றவும்.",
          ],
        },
        {
          category: "தடுப்பூசி மற்றும் சுகாதாரம்",
          tips: [
            "அனைத்து விலங்குகளுக்கும் வழக்கமான தடுப்பூசிகளை உறுதிசெய்யவும்.",
            "மருத்துவருடன் வழக்கமான சுகாதார பரிசோதனைகளை திட்டமிடவும்.",
            "நோயின் ஆரம்ப அறிகுறிகளை கண்காணிக்கவும்.",
          ],
        },
        {
          category: "உணவு மற்றும் ஊட்டச்சத்து",
          tips: [
            "அத்தியாவசிய ஊட்டச்சத்துகளுடன் சமநிலையான உணவை வழங்கவும்.",
            "தூய்மையான மற்றும் புதிய தண்ணீரை அணுகுமிடத்தில் வைக்கவும்.",
            "கெட்டுப்போன அல்லது மாசுபட்ட உணவை வழங்க வேண்டாம்.",
          ],
        },
        {
          category: "நோய் கட்டுப்பாடு",
          tips: [
            "நோயுற்ற விலங்குகளை தனிமைப்படுத்தி நோய் பரவாமல் தடுக்கவும்.",
            "சுற்றுப்புறத்தில் பூச்சிகள் மற்றும் பராசிட்களை கட்டுப்படுத்தவும்.",
            "நோய் நுழைவைத் தடுக்க உயிரியல் பாதுகாப்பு நடவடிக்கைகளை செயல்படுத்தவும்.",
          ],
        },
      ],
    },
  };

  const currentTranslations = translations[language] || translations.en;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{currentTranslations.title}</Text>
      {currentTranslations.categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.category}</Text>
          {category.tips.map((tip, tipIndex) => (
            <View key={tipIndex} style={styles.tipItem}>
              <Text style={styles.tipText}>• {tip}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 10,
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: "#555",
  },
});

export default DiseasePrevention;
