import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity, 
  Alert,
  ScrollView,
  ActivityIndicator,   
  Linking,
  useColorScheme,
  ImageBackground, 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CurrentAffairs from "./Components/CurrentAffairs";
import DiseaseDescription from "./Components/DiseaseDescription";
import { lightTheme, darkTheme } from "./Components/themes";
import TreatmentPage from "./Components/TreatmentPage";
import DiseaseReport from "./Components/DiseaseReport";
import DiseasePrevention from "./Components/DiseasePrevention";
import HomePage from "./Components/HomePage";
import Doctor from "./Components/Doctor";

const Stack = createStackNavigator();

const translations = {
  en: {
    homeTitle: "🧑🏻‍🌾...LIVESTOCK HEALTHCARE...🐄",
    weatherInfo: "Weather Information:",
    temperature: "Temperature",
    humidity: "Humidity",
    weather: "Weather",
    location: "Geographical location",
    submit: "Submit",
    clear: "Clear",
    describeSymptoms: "Describe the symptoms... <optional>",
    selectLanguage: "Select Language",
    reportTitle: "Disease Report",
    noDescription: "No description provided.",
    diagnosis: "Diagnosis",
    confidence: "Confidence",
    noDiseaseDetected: "No disease detected. Please try with another image.",
    doctorTitle: "Doctor Details",
    error: "Error",
    provideImage: "Please provide an image.",
    diagnosisSuccess: "Diagnosis completed successfully!",
    info: "Info",
    submitError: "Failed to submit data. Please try again.",
    diseaseReport: "Disease Report",
    diseaseDescription: "Disease Description",
    diseasePrevention: "Disease Prevention",
    currentAffairs: "Current Affairs",
    diagnosis: "Diagnosis",
    report: "Report",
    goBack: "Go Back",
  },
  ta: {
    homeTitle: "🧑🏻‍🌾...LIVESTOCK HEATHCARE...🐄",
    weatherInfo: "வானிலை தகவல்:",
    temperature: "வெப்பநிலை",
    humidity: "ஈரப்பதம்",
    weather: "வானிலை",
    location: "புவியியல் அமைப்பு",
    submit: "சமர்ப்பிக்கவும்",
    clear: "அழிக்கவும்",
    describeSymptoms: "அறிகுறிகளை விவரிக்கவும்... <விருப்பம்>",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    reportTitle: "நோய் அறிக்கை",
    noDescription: "விளக்கம் வழங்கப்படவில்லை.",
    diagnosis: "நோயறிதல்",
    confidence: "நம்பகத்தன்மை",
    noDiseaseDetected: "நோய் கண்டறியப்படவில்லை. மற்றொரு படத்தை முயற்சிக்கவும்.",
    doctorTitle: "மருத்துவர் விவரங்கள்",
    error: "பிழை",
    provideImage: "படத்தை வழங்கவும்.",
    diagnosisSuccess: "நோயறிதல் வெற்றிகரமாக முடிந்தது!",
    info: "தகவல்",
    submitError: "தரவை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    diseaseReport: "நோய் அறிக்கை",
    diseaseDescription: "நோய் விளக்கம்",
    diseasePrevention: "நோய் தடுப்பு",
    currentAffairs: "நடப்பு நிகழ்வுகள்",
    diagnosis: "நோயறிதல்",
    report: "அறிக்கை",
    goBack: "திரும்பிச் செல்லவும்",
  },
};

const diseaseNameTranslations = {
  "Foot-and-Mouth Disease": "கால் மற்றும் வாய் நோய்",
  "Bovine Tuberculosis": "பசு காசநோய்",
  Mastitis: "மாஸ்டிடிஸ்",
  Rabies: "காய்ச்சல்",
  Brucellosis: "புரூசெல்லோசிஸ்",
  Bluetongue: "நீலநாக்கு",
  "Lumpy Skin Disease": "கட்டியான தோல் நோய்",
  "Fowl Pox": "பறவை பாக்ஸ்",
  "Newcastle Disease": "நியூகாஸ்டில் நோய்",
};

export default function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === "dark");
  const [language, setLanguage] = useState("en"); // Default to English

  const theme = isDarkMode ? darkTheme : lightTheme;

  const requestPermissions = async () => {
    const mediaLibraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const locationPermission =
      await Location.requestForegroundPermissionsAsync();

    if (
      cameraPermission.status !== "granted" ||
      mediaLibraryPermission.status !== "granted" ||
      locationPermission.status !== "granted"
    ) {
      Alert.alert(
        "Permission Required",
        "We need permission to access your camera, media library, and location. Please grant these permissions in your device settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Go to Settings", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const pickImageFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      } else {
        console.log("Image selection canceled");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to access the media library. Please try again."
      );
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      } else {
        console.log("Camera capture canceled");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to access the camera. Please try again.");
    }
  };

  const clearData = () => {
    setImage(null);
    setDescription("");
    setDiagnosis(null);
    setResponseMessage("");
  };

  const submitData = async (navigation) => {
    if (!image) {
      Alert.alert(
        translations[language].error,
        translations[language].provideImage
      );
      return;
    }

    setLoading(true);

    try {
      const base64Image = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/livestock_disease/10",
        params: {
          api_key: "R5HbVpff9rrkLw8C6ol1",
        },
        data: base64Image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (
        response.data &&
        response.data.predictions &&
        response.data.predictions.length > 0
      ) {
        const diagnosisResult = response.data.predictions.map((pred) => ({
          class:
            language === "ta"
              ? diseaseNameTranslations[pred.class] || pred.class // Translate to Tamil if available
              : pred.class, // Default to English
          confidence: pred.confidence,
        }));

        setDiagnosis(diagnosisResult);
        setResponseMessage(translations[language].diagnosisSuccess);
        navigation.navigate("DiseaseReport", {
          diagnosis: diagnosisResult,
          description: description || translations[language].noDescription,
          image: image,
        });
      } else {
        setResponseMessage(translations[language].noDiseaseDetected);
        Alert.alert(
          translations[language].info,
          translations[language].noDiseaseDetected
        );
      }
    } catch (error) {
      console.error(
        "Error submitting data: ",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        translations[language].error,
        translations[language].submitError
      );
    } finally {
      setLoading(false);
    }
  };

  const getLocationAndWeather = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need permission to access your location."
        );
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&appid=c3c94c61673d10bef41ab11e3d1c909f`
      );

      setWeather(weatherResponse.data);
    } catch (error) {
      console.error("Location or weather fetch failed:", error);
      Alert.alert(
        "Error",
        "Failed to get location or weather data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestPermissions();
    getLocationAndWeather();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            title: translations[language].homeTitle,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
              color: "black",
            },
          }}
        >
          {(props) => (
            <ImageBackground
              source={require("./assets/home.jpg")} // Add your background image here
              style={styles.backgroundImage}
            >
              <SafeAreaView style={theme.container}>
                <Header
                  onHomePress={() => props.navigation.navigate("HomePage")}
                  onThemePress={toggleTheme}
                  isDarkMode={isDarkMode}
                />

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                  {/* Language Picker */}
                  <View style={styles.languagePickerContainer}>
                    <Text style={styles.languagePickerLabel}>
                      {translations[language].selectLanguage}
                    </Text>
                    <Picker
                      selectedValue={language}
                      style={styles.languagePicker}
                      onValueChange={(itemValue) =>
                        handleLanguageChange(itemValue)
                      }
                    >
                      <Picker.Item label="English" value="en" />
                      <Picker.Item label="தமிழ் (Tamil)" value="ta" />
                    </Picker>
                  </View>

                  {weather && location && (
                    <View style={styles.weatherContainer}>
                      <Text style={styles.weatherTitle}>
                        {translations[language].weatherInfo}
                      </Text>
                      <Text style={styles.weatherText}>
                        {translations[language].temperature}:{" "}
                        {Math.round(weather.main.temp - 273.15)}°C
                      </Text>
                      <Text style={styles.weatherText}>
                        {translations[language].humidity}:{" "}
                        {weather.main.humidity}%
                      </Text>
                      <Text style={styles.weatherText}>
                        {translations[language].weather}:{" "}
                        {weather.weather[0].description}
                      </Text>
                      <Text style={styles.weatherText}>
                        {translations[language].location}:{" "}
                        {location.latitude.toFixed(2)},{" "}
                        {location.longitude.toFixed(2)}
                      </Text>
                    </View>
                  )}

                  {loading && (
                    <ActivityIndicator
                      size="large"
                      color="#0000ff"
                      style={styles.loadingIndicator}
                    />
                  )}

                  {responseMessage && (
                    <View style={styles.responseContainer}>
                      <Text style={styles.responseText}>
                        {responseMessage ===
                        "No disease detected. Please try with another image."
                          ? translations[language].noDiseaseDetected
                          : responseMessage}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.imagePicker}
                    onPress={pickImageFromLibrary}
                  >
                    {image ? (
                      <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                      <Image
                        source={require("./assets/placeholder_gallery-modified.png")}
                        style={styles.image}
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.imagePicker}
                    onPress={pickImageFromCamera}
                  >
                    {image ? (
                      <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                      <Image
                        source={require("./assets/placeholder.png")}
                        style={styles.image}
                      />
                    )}
                  </TouchableOpacity>

                  <TextInput
                    style={styles.input}
                    placeholder={translations[language].describeSymptoms}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                  />

                  <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                      <Button
                        title={translations[language].submit}
                        onPress={() => submitData(props.navigation)}
                      />
                    </View>
                    <View style={styles.buttonWrapper}>
                      <Button
                        title={translations[language].clear}
                        onPress={clearData}
                        color="silver"
                      />
                    </View>
                  </View>
                </ScrollView>

                <Footer navigation={props.navigation} language={language} />
              </SafeAreaView>
            </ImageBackground>
          )}
        </Stack.Screen>

        {/* Register HomePage */}
        <Stack.Screen
          name="HomePage"
          options={{
            title: translations[language].homeTitle, // Dynamically set the title
            headerTitleAlign: "center",
          }}
        >
          {(props) => <HomePage {...props} language={language} />}
        </Stack.Screen>

        {/* Other Screens */}
        <Stack.Screen
          name="Disease Prevention"
          options={{
            title: translations[language].preventionTitle,
            headerTitleAlign: "center",
          }}
        >
          {(props) => <DiseasePrevention {...props} language={language} />}
        </Stack.Screen>
        <Stack.Screen
          name="Current Affairs"
          options={{
            title: translations[language].currentAffairsTitle,
            headerTitleAlign: "center",
          }}
        >
          {(props) => <CurrentAffairs {...props} language={language} />}
        </Stack.Screen>
        <Stack.Screen
          name="Disease Description"
          options={{
            title: translations[language].descriptionTitle,
            headerTitleAlign: "center",
          }}
        >
          {(props) => <DiseaseDescription {...props} language={language} />}
        </Stack.Screen>
        <Stack.Screen name="TreatmentPage">
          {(props) => <TreatmentPage {...props} language={language} />}
        </Stack.Screen>
        <Stack.Screen name="DiseaseReport">
          {(props) => <DiseaseReport {...props} language={language} />}
        </Stack.Screen>
        <Stack.Screen
          name="Doctor"
          options={{
            title: translations[language].doctorTitle, // Dynamically set the title
            headerTitleAlign: "center",
          }}
        >
          {(props) => <Doctor {...props} language={language} />}
        </Stack.Screen>
        <Stack.Screen name="DiseasePrevention">
          {(props) => <DiseasePrevention {...props} language={language} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", 
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    gap: 20,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    height: 170,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  weatherContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  weatherTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weatherText: {
    fontSize: 17,
    color: "#333",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  responseContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
  },
  responseText: {
    fontSize: 16,
    color: "#333",
  },
  languagePickerContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  languagePickerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", 
    marginBottom: 10,
    textAlign: "center", 
  },
  languagePicker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
