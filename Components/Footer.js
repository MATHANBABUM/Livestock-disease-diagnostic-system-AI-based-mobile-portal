import React from "react";
import { View, Button } from "react-native";

const Footer = ({ navigation, language }) => {
  const translations = {
    en: {
      diseaseDescription: "Disease Description",
      currentAffairs: "Current Affairs",
    },
    ta: {
      diseaseDescription: "நோய் விளக்கம்",
      currentAffairs: "தற்போதைய நிகழ்வு",
    },
  };


  const currentTranslations = translations[language] || translations.en;

  

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 25,
        backgroundColor: "white",
      }}
    >
      <Button
        title={currentTranslations.diseaseDescription}
        onPress={() => navigation.navigate("Disease Description")}
      />
      <Button
        title={currentTranslations.currentAffairs}
        onPress={() => navigation.navigate("Current Affairs")}
      />
    </View>
  );
};

export default Footer;
