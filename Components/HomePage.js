import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const HomePage = ({ navigation, language }) => {
  const translations = {
    en: {
      welcomeMessage: "Welcome to Livestock Healthcare",
      preventionTips: "Prevention Tips",
      doctorDetails: "Doctor Details",
    },
    ta: {
      welcomeMessage: "முகப்பு பக்கம்",
      preventionTips: "குறிப்புகள்",
      doctorDetails: "மருத்துவர்கள்",
    },
  };

  
  const currentTranslations = translations[language] || translations.en;

  

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{currentTranslations.welcomeMessage}</Text>
        <View style={styles.imageContainer}>
          {/* Disease Prevention Image */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Disease Prevention")}
          >
            <Image
              source={require("../assets/disease-prevention.webp")}
              style={styles.image}
            />
            <Text style={styles.imageText}>
              {currentTranslations.preventionTips}
            </Text>
          </TouchableOpacity>

          {/* Doctor Image */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Doctor")}
          >
            <Image
              source={require("../assets/doctor.jpg")}
              style={styles.image}
            />
            <Text style={styles.imageText}>
              {currentTranslations.doctorDetails}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default HomePage;
