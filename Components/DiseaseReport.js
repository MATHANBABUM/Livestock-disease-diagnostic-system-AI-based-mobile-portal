import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

const DiseaseReport = ({ route, navigation, language }) => {
  const { diagnosis, description, image } = route.params;

  const translations = {
    en: {
      diagnosis: "Diagnosis",
      confidence: "Confidence",
      noDescription: "No description provided.",
      noDiagnosis: "No diagnosis data available.",
      goBack: "Go Back",
      viewDetails: "View Details",
      report: "Report", // Add this line for English
    },
    ta: {
      diagnosis: "நோயறிதல்",
      confidence: "நம்பகத்தன்மை",
      noDescription: "விளக்கம் வழங்கப்படவில்லை.",
      noDiagnosis: "நோயறிதல் தரவுகள் கிடைக்கவில்லை.",
      goBack: "திரும்பிச் செல்லவும்",
      viewDetails: "விவரங்களை காண்க",
      report: "அறிக்கை", // Add this line for Tamil
    },
  };

  const diseaseNameTranslations = {
    "Foot and Mouth disease": "கால் மற்றும் வாய் நோய்",
    "Bovine-tuberculosis": "பசு காசநோய்",
    mastitis: "பால் பற்றல் நோய்",
    "Lumpy skin disease": "கட்டியான தோல் நோய்",
    "Fowl-pox": "பறவை(கோழி)அம்மை நோய்",
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={diagnosis}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              {translations[language].diagnosis} {translations[language].report}
            </Text>

            {/* Display the uploaded image */}
            {image && (
              <Image source={{ uri: image }} style={styles.uploadedImage} />
            )}

            {/* Display the description */}
            {description ? (
              <Text style={styles.description}>
                <Text style={styles.label}>
                  {translations[language].diagnosis}:
                </Text>{" "}
                {description}
              </Text>
            ) : (
              <Text style={styles.noDataText}>
                {translations[language].noDescription}
              </Text>
            )}
          </>
        }
        renderItem={({ item, index }) => (
          <View key={index} style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportHeaderText}>
                {translations[language].diagnosis} {index + 1}
              </Text>
            </View>
            <View style={styles.reportBody}>
              <Text style={styles.reportText}>
                <Text style={styles.label}>
                  {translations[language].diagnosis}:
                </Text>{" "}
                {language === "ta" && diseaseNameTranslations[item.class]
                  ? diseaseNameTranslations[item.class] // Use Tamil translation if available
                  : item.class}{" "}
                {/* Default to English */}
              </Text>
              <Text style={styles.reportText}>
                <Text style={styles.label}>
                  {translations[language].confidence}:
                </Text>{" "}
                {(item.confidence * 100).toFixed(2)}%
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Disease Description", {
                    disease: item, // Pass the entire disease object
                  })
                }
              >
                <Text style={styles.linkText}>
                  {translations[language].viewDetails}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noDataText}>
            {translations[language].noDiagnosis}
          </Text>
        }
        ListFooterComponent={
          <View style={styles.buttonContainer}>
            <Button
              title={translations[language].goBack}
              onPress={() => navigation.goBack()}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  uploadedImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  reportCard: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  reportHeader: {
    backgroundColor: "#4caf50",
    padding: 10,
  },
  reportHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  reportBody: {
    padding: 15,
  },
  reportText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#4caf50",
  },
  linkText: {
    fontSize: 16,
    color: "#1e90ff",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  noDataText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default DiseaseReport;
